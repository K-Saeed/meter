import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-settings-edit',
  templateUrl: './settings-edit.component.html',
  styleUrls: ['./settings-edit.component.css']
})
export class SettingsEditComponent implements OnInit {
  ngOnInit() {
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    const profilePic = document.getElementById('profilePic') as HTMLImageElement;
    const uploadText = document.querySelector('.upload-text') as HTMLHeadingElement;

    profilePic.addEventListener('click', () => {
      fileInput.click();
    });

    fileInput.addEventListener('change', (event: Event) => {
      const input = event.target as HTMLInputElement;
      if (input.files && input.files[0]) {
        const reader = new FileReader();
        reader.onload = (e: ProgressEvent<FileReader>) => {
          profilePic.src = e.target!.result as string;
          profilePic.style.width = '100%';
          profilePic.style.height = '150px';
          uploadText.style.display = 'none';
          profilePic.style.borderRadius = '50%';
          profilePic.style.marginTop = '0.6rem';
        };
        reader.readAsDataURL(input.files[0]);
      }
    });
  }
}
