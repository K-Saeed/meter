import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomerDto, ProviderDto, SellerDto, UserDto } from 'src/app/core/models/user-to-be-added.model';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-add-modal',
  templateUrl: './user-add-modal.component.html',
  styleUrls: ['./user-add-modal.component.css']
})
export class UserAddModalComponent implements OnInit {
  dropdownOpen = false;
  phoneNumber: string = '+966';
  showPassword = false;
  showConfirmPassword = false;
  userForm!: FormGroup;
  selectedVisibility: string = '';
  isOnNextStep: boolean = false; // Tracks whether we are on the next step for providers

  Role = [
    { name: 'Customer', selected: false },
    { name: 'Provider', selected: false },
    { name: 'Merchant', selected: false },
  ];

  ActivityType = [
    { id: "1", label: "Survey Office", arabicLabel: "مكتب مساحى" },
    { id: "2", label: "Engineering Office", arabicLabel: "مكتب هندسي" },
    { id: "3", label: "Design Office", arabicLabel: "مكتب تصميم" },
    { id: "4", label: "Interior Design Office", arabicLabel: "مكتب تصميم داخلي" },
    { id: "5", label: "Engineering Consultation Company", arabicLabel: "شركة استشارات هندسية" },
    { id: "6", label: "Safety Office", arabicLabel: "مكتب سلامة" },
    { id: "7", label: "Other", arabicLabel: "أخري" }
  ];

  form!: FormGroup;
  providerCurrentStep = 0;
  merchantCurrentStep = 0;
  maxFileSize = 25 * 1024 * 1024;
  fileToBeUploaded!: File;
  filePreview!: (string | ArrayBuffer | null);

  constructor(private fb: FormBuilder, private cdr: ChangeDetectorRef, private userService: UserService) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: [this.phoneNumber, [Validators.required, Validators.pattern(/^\+966\d{8,9}$/)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      role: ['Customer', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      neighborhood: ['', Validators.required],
      provider: this.fb.group({
        activityType: ['1', Validators.required],
        serviceDescription: ['', Validators.required],
        licenseNumber: ['', Validators.required],
        commercialRegistration: ['', Validators.required],
        commercialDate: ['', Validators.required],
        ownerName: ['', Validators.required],
        managerName: ['', Validators.required],
        managerPhoneNumber: [this.phoneNumber, [Validators.required, Validators.pattern(/^\+966\d{8,9}$/)]],
        region: ['', Validators.required],
        latitude: [null, Validators.required],
        longitude: [null, Validators.required],
        serviceProvider: ['', Validators.required],
        // files: this.fb.array([], Validators.required),
      }),
      merchant: this.fb.group({
        facilityActivity: ['', Validators.required],
        serviceDescription: ['', Validators.required],
        licenseNumber: ['', Validators.required],
        commercialRegistration: ['', Validators.required],
        ownerName: ['', Validators.required],
        managerName: ['', Validators.required],
        managerPhoneNumber: [this.phoneNumber, [Validators.required, Validators.pattern(/^\+966\d{8,9}$/)]],
        region: ['', Validators.required],
        latitude: [null, Validators.required],
        longitude: [null, Validators.required],
        serviceProvider: ['', Validators.required],
        // files: this.fb.array([], Validators.required),
      }),
    }, { validators: this.passwordMatchValidator });
  }

  isFormValid(): boolean {

    const commonFieldsValid =
      this.form.get('name')?.valid &&
      this.form.get('email')?.valid &&
      this.form.get('phoneNumber')?.valid &&
      this.form.get('password')?.valid &&
      this.form.get('confirmPassword')?.valid &&
      this.form.get('password')?.value === this.form.get('confirmPassword')?.value &&
      this.form.get('address')?.valid &&
      this.form.get('city')?.valid &&
      this.form.get('neighborhood')?.valid;

    if (!commonFieldsValid) {
      return false;
    }
    const role = this.form.get('role')?.value;

    if (role === 'Customer') {
      return true;
    } else if (role === 'Provider') {
      return (this.form.get('provider') as FormGroup).valid;
    } else if (role === 'Merchant') {
      return (this.form.get('merchant') as FormGroup).valid;
    }

    return false;
  }

  getGroup(groupName: string): FormGroup {
    return this.form.get(groupName) as FormGroup;
  }

  getControl(controlName: string) {
    return this.form.get(controlName);
  }

  getNestedControl(group: string, control: string) {
    return this.getGroup(group).get(control);
  }

  onSubmit(): void {

    if (this.isFormValid()) {
      this.prepareUserToBeAdded();
    } else {
      alert('Invalid Form')
    }
  }

  prepareUserToBeAdded() {

    let role;
    if (this.getControl('role')?.value === 'Merchant') {
      role = 'Seller'
    } else {
      role = this.getControl('role')?.value;
    }

    const formData = new FormData();

    const userToBeAdded = new UserDto({
      name: this.getControl('name')?.value,
      email: this.getControl('email')?.value,
      phoneNumber: this.getControl('phoneNumber')?.value,
      password: this.getControl('password')?.value,
      role: role,

      customer: this.getControl('role')?.value === 'Customer' ? new CustomerDto({
        address: this.getControl('address')?.value,
        city: this.getControl('phoneNumber')?.value,
        neighborhood: this.getControl('phoneNumber')?.value,
      }) : undefined,

      provider: this.getControl('role')?.value === 'Provider' ? new ProviderDto({
        address: this.getControl('address')?.value,
        city: this.getControl('phoneNumber')?.value,
        neighborhood: this.getControl('phoneNumber')?.value,

        activityType: this.getNestedControl('provider', 'activityType')?.value,
        serviceDescription: this.getNestedControl('provider', 'serviceDescription')?.value,
        licenseNumber: this.getNestedControl('provider', 'licenseNumber')?.value,
        commercialRegistration: this.getNestedControl('provider', 'commercialRegistration')?.value,
        commercialDate: this.getNestedControl('provider', 'commercialDate')?.value,
        ownerName: this.getNestedControl('provider', 'ownerName')?.value,
        managerName: this.getNestedControl('provider', 'managerName')?.value,
        managerPhoneNumber: this.getNestedControl('provider', 'managerPhoneNumber')?.value,
        region: this.getNestedControl('provider', 'region')?.value,
        latitude: this.getNestedControl('provider', 'latitude')?.value,
        longitude: this.getNestedControl('provider', 'longitude')?.value,
        serviceProvider: this.getNestedControl('provider', 'serviceProvider')?.value,
        // files: this.getNestedControl('provider', 'files')?.value,
      }) : undefined,

      seller: this.getControl('role')?.value === 'Merchant' ? new SellerDto({
        address: this.getControl('address')?.value,
        city: this.getControl('phoneNumber')?.value,
        neighborhood: this.getControl('phoneNumber')?.value,

        facilityActivity: this.getNestedControl('merchant', 'facilityActivity')?.value,
        serviceDescription: this.getNestedControl('merchant', 'serviceDescription')?.value,
        licenseNumber: this.getNestedControl('merchant', 'licenseNumber')?.value,
        commercialRegistration: this.getNestedControl('merchant', 'commercialRegistration')?.value,
        ownerName: this.getNestedControl('merchant', 'ownerName')?.value,
        managerName: this.getNestedControl('merchant', 'managerName')?.value,
        managerPhoneNumber: this.getNestedControl('merchant', 'managerPhoneNumber')?.value,
        region: this.getNestedControl('merchant', 'region')?.value,
        latitude: this.getNestedControl('merchant', 'latitude')?.value,
        longitude: this.getNestedControl('merchant', 'longitude')?.value,
        serviceProvider: this.getNestedControl('merchant', 'serviceProvider')?.value,
        // files: this.getNestedControl('merchant', 'files')?.value,
      }) : undefined
    });

    formData.append(
      'userDto',
      new Blob([JSON.stringify(userToBeAdded)], { type: 'application/json' })
    );

    if (this.fileToBeUploaded) {
      formData.append(`logo-image`, this.fileToBeUploaded, this.fileToBeUploaded.name);
    }

    this.addUser(formData);
  }

  addUser(formData: FormData) {
    this.userService.addUser(formData).subscribe({
      next: (n) => {
        console.log(n);
      },
      error: (e) => {
        console.log(e);
      }
    })
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

  nextStep() {
    if (this.form.get('role')?.value === 'Provider')
      this.providerCurrentStep++
    else if (this.form.get('role')?.value === 'Merchant') {
      this.merchantCurrentStep++
    }
  }

  previousStep() {
    if (this.form.get('role')?.value === 'Provider')
      this.providerCurrentStep--
    else if (this.form.get('role')?.value === 'Merchant') {
      this.merchantCurrentStep--
    }
  }

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  updateSelectedRole(role: string) {
    this.selectedVisibility = role;
    this.form.controls['role'].setValue(role);
    this.dropdownOpen = false;
  }

  selectedActivity!:string;
  updateSelectedActivityType(activity: any) {
    this.selectedActivity = activity.label;
    this.getGroup('provider').controls['activityType'].setValue(activity.id);
    this.dropdownOpen = false;

    console.log(this.getNestedControl('provider','activityType')?.value)
  }

  goToNextStep() {
    if (this.userForm.valid) {
      this.isOnNextStep = true; // Move to the next step
    } else {
      const invalidFields = Object.keys(this.userForm.controls).filter(
        field => this.userForm.controls[field].invalid
      );
      console.log('Invalid fields:', invalidFields); // Debugging
      alert('Please fill out all required fields.');
    }
    this.cdr.detectChanges();
  }


  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  onPhoneInput(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.value.startsWith('+966')) {
      input.value = '+966';
    }
  }

  passwordMatchValidator(group: FormGroup): { mismatch: boolean } | null {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }
}
