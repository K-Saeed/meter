import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { Router } from "@angular/router";
import { catchError, throwError } from "rxjs";
import { Regex } from "src/app/shared/constant/regex";
import { AuthService } from "src/app/shared/service/auth/auth.service";
import { LoginService } from "src/app/shared/service/auth/logIn.service";

@Component({
  selector: "app-sign-in",
  templateUrl: "./sign-in.component.html",
  styleUrls: ["./sign-in.component.css"],
})
export class SignInComponent implements OnInit {
  showPassword = false;
  wrongPasswordOrEmailError = false;
  generalLoginError = false;
  submitClicked = false;
  unverifiedEmailError = false;
  signInForm!: FormGroup;
  public errorMessage!: string;
  public showError: boolean = false;
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
  constructor(private fb: FormBuilder, private loginService: LoginService) {}
  ngOnInit(): void {
    this.initializeForm();
    this.signInForm.reset();
  }
  private initializeForm(): void {
    this.signInForm = this.fb.group({
      emailAddress: new FormControl("", {
        validators: [Validators.required, Validators.email],
        updateOn: "blur",
      }),
      password: new FormControl("", [
        Validators.required,
        // Validators.pattern(Regex.PASSWORD_REGEX),
      ]),
    });
  }

  get emailAddressControl(): FormControl {
    return this.signInForm.get("emailAddress") as FormControl;
  }
  get passwordControl(): FormControl {
    return this.signInForm.get("password") as FormControl;
  }

  submit() {
    if (this.signInForm.valid) {
      const emailAddress = this.signInForm.get("emailAddress")?.value;
      const password = this.signInForm.get("password")?.value;
      this.loginService.login(emailAddress, password);
    } else {
      this.signInForm.markAllAsTouched();
    }
  }
}
