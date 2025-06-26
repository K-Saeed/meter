import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { UserTableDto } from '../../users/models/user-table.model';
import { combineLatest, Subscription } from 'rxjs';
import { UserService } from '../../users/services/user.service';
import { Message } from '../chat-classes';
import { SocketChatService } from '../socket-chat.service';
import { io, Socket } from 'socket.io-client';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-send-to-all',
  templateUrl: './send-to-all.component.html',
  styleUrls: ['./send-to-all.component.css']
})
export class SendToAllComponent {

  @Input() key: string = '';
  @Input() socket!: Socket;
  activeRole: string | null = null;
  activeStatus: string | null = null;
  status!: string;
  role!: string;
  userList: UserTableDto[] = [];
  filteredUsers: UserTableDto[] = [];
  selectedUsers: string[] = [];
  selectAllChecked = false;
  maxFileSize = 25 * 1024 * 1024;
  fileToBeUploaded!: File | null;
  filePreview!: (string | ArrayBuffer | null);
  searchTerm: string = '';
  // private socket!: Socket;
  userEmail: string = '';
  message: string = '';

  private statusTypeSubscription!: Subscription;
  constructor(private userService: UserService, private cdr: ChangeDetectorRef, private socketChatService: SocketChatService,
    public translateService: TranslateService) {

  }

  ngOnInit() {
    this.statusTypeSubscription = combineLatest([
      this.userService.status$,
      this.userService.role$
    ]).subscribe(([status, role]) => {
      this.status = status!;
      this.role = role!;
      this.getUserList();
    });
    this.userEmail = this.socketChatService.getUserProfile()?.email ?? '';
  }

  applySearch() {
    this.filterUsers();
  }

  filterUsers() {
    const term = this.searchTerm.toLowerCase();
    this.filteredUsers = this.userList.filter(user =>
      user.name.toLowerCase().includes(term) || // Match by name
      user.email.toLowerCase().includes(term) || // Match by email
      user.mobile?.toLowerCase().includes(term) // Match by phone (optional)
    );
  }

  ngOnDestroy(): void {
    if (this.statusTypeSubscription) {
      this.statusTypeSubscription.unsubscribe();
    }
  }

  getUserList() {
    this.userService.getUsersList(this.role, this.status).subscribe(
      (res) => {
        this.userList = res;
        this.filteredUsers = res;
        this.cdr.detectChanges();
      },
      (err) => {
        console.log(err);
      }
    );
  }


  onFilesSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      const file = input.files[0];

      if (file.size > this.maxFileSize) {
        alert(`File ${file.name} exceeds the maximum file size of 25MB.`);
      } else {
        this.fileToBeUploaded = file;
        this.imagePreview(file);
      }
    }
  }

  imagePreview(file: File) {
    const reader = new FileReader();
    reader.onload = (e: ProgressEvent<FileReader>) => {
      if (e.target && e.target.result) {
        this.filePreview = e.target.result as string;
      }
    };
    reader.readAsDataURL(file);
  }

  sendGroupMessage(): void {
    if (this.fileToBeUploaded && this.fileToBeUploaded !== null) {
      const formData = new FormData();
      formData.append(`messageFile`, this.fileToBeUploaded, this.fileToBeUploaded.name);

      this.socketChatService.sendFile(formData).subscribe({
        next: (n) => {
          console.log(n);
          const message = new Message({
            content: this.socketChatService.encrypt(n.filePath, this.key),
            contentType: 'MEDIA',
            key: this.key,
            senderEmail: this.userEmail,
            recipientEmails: this.selectedUsers,
          });
          this.socket.emit('sendMessageToGroup', message);
          this.message = '';
          this.fileToBeUploaded = null;
        },
        error: (e) => {
          console.log(e);
        }
      })
    } else if (this.message.trim()) {
      const message = new Message({
        content: this.socketChatService.encrypt(this.message, this.key),
        contentType: 'TEXT',
        key: this.key,
        senderEmail: this.userEmail,
        recipientEmails: this.selectedUsers,
      });
      this.socket.emit('sendMessageToGroup', message);
      this.message = '';
    }
  }

  sendMessage(): void {
    if (this.selectedUsers.length > 0 && (this.message.trim() || this.fileToBeUploaded)) {
      this.sendGroupMessage();
    } else {
      alert('Please select at least one user and enter a message.');
    }
  }

  isLoading = false;

  toggleRole(role: string, event: Event): void {
    event.preventDefault();
    if (this.activeRole === role) {
      this.activeRole = null;
    } else {
      this.activeRole = role;
    }
  }

  toggleStatus(status: string, event: Event): void {
    event.preventDefault();
    if (this.activeStatus === status) {
      this.activeStatus = null;
    } else {
      this.activeStatus = status;
    }
  }

  isActiveRole(role: string): boolean {
    return this.activeRole === role;
  }

  isActiveStatus(status: string): boolean {
    return this.activeStatus === status;
  }

  filter(): void {
    const role = this.activeRole;
    const status = this.activeStatus;

    if (role || status) {
      this.userService.setType(role);
      this.userService.setStatus(status);
    } else {
      this.userService.setType('');
      this.userService.setStatus('');
    }
  }


  updateSelectedUser(user: UserTableDto): void {
    if (user.selected) {

      if (!this.selectedUsers.find(email => email === user.email)) {
        this.selectedUsers.push(user.email);
      }
    } else {
      this.selectedUsers = this.selectedUsers.filter(email => email !== user.email);
    }
  }

  toggleSelectAll(selectAll: boolean): void {
    this.userList.forEach(user => user.selected = selectAll);
    this.selectAllChecked = selectAll;
    this.updateSelectedUsersList();
  }

  updateSelectedUsers(): void {
    this.updateSelectedUsersList();
  }

  updateSelectedUsersList(): void {
    this.selectedUsers = this.userList.filter(user => user.selected).map(user => user.email);
  }

  updateSelectAllState(): void {
    this.selectAllChecked = this.userList.every(user => user.selected);
    this.updateSelectedUsersList();
  }


  reloadPage(): void {
    window.location.reload();
  }
}
