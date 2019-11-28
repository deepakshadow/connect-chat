import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { UserService } from "../user.service";

@Component({
  selector: "app-sign-up",
  templateUrl: "./sign-up.component.html",
  styleUrls: ["./sign-up.component.css"]
})
export class SignUpComponent implements OnInit {
  signUpForm: FormGroup;
  firstName: FormControl;
  lastName: FormControl;
  mobileNumber: FormControl;
  email: FormControl;
  password: FormControl;
  apiKey: FormControl;

  constructor(
    private router: Router,
    private userService: UserService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.createFormControl();
    this.createForm();
  }

  createFormControl = () => {
    this.firstName = new FormControl("", Validators.required);
    this.lastName = new FormControl("", Validators.required);
    this.mobileNumber = new FormControl("", Validators.required);
    this.email = new FormControl("", [Validators.required, Validators.email]);
    this.password = new FormControl("", Validators.required);
    this.apiKey = new FormControl("", Validators.required);
  };

  createForm = () => {
    this.signUpForm = new FormGroup({
      firstName: this.firstName,
      lastName: this.lastName,
      mobileNumber: this.mobileNumber,
      email: this.email,
      password: this.password,
      apiKey: this.apiKey
    });
  };

  onSubmit = () => {
    if (this.signUpForm.valid) {
      console.log(
        `TCL: SignUpComponent -> onSubmit -> this.signUpForm`,
        this.signUpForm
      );
      this.userService.signUpFunction(this.signUpForm.value).subscribe(
        next => {
          console.log(`TCL: SignUpComponent -> onSubmit -> next`, next);
          if (next.status === 200) {
            this.toastr.success(next.message);
            setTimeout(() => {
              this.router.navigate(["/login"]);
            }, 1300);
          } else {
            this.toastr.error(next.message);
          }
        },
        error => {
          console.log(`TCL: SignUpComponent -> onSubmit -> error`, error);
          this.toastr.error(`some unknown error occurred!!!`);
        }
      );
    }
  };

  goToLogin = () => {
    this.router.navigate(["/login"]);
  };
}
