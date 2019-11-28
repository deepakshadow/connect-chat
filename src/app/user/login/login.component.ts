import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { UserService } from "../user.service";
import { ToastrService } from "ngx-toastr";
import { CookieService } from "ngx-cookie-service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  email: FormControl;
  password: FormControl;

  constructor(
    private router: Router,
    private userService: UserService,
    private toastr: ToastrService,
    private cookie: CookieService
  ) {}

  ngOnInit() {
    this.createFormControl();
    this.createForm();
  }

  createFormControl = () => {
    this.email = new FormControl("", [Validators.required, Validators.email]);
    this.password = new FormControl("", Validators.required);
  };

  createForm = () => {
    this.loginForm = new FormGroup({
      email: this.email,
      password: this.password
    });
  };

  onSubmit = () => {
    if (this.loginForm.valid) {
      console.log(
        `TCL: LoginComponent -> onSubmit -> this.loginForm`,
        this.loginForm
      );
      this.userService.loginFunction(this.loginForm.value).subscribe(
        next => {
          console.log(`TCL: LoginComponent -> onSubmit -> next`, next);
          if (next.status === 200) {
            this.toastr.success(next.message);
            this.cookie.set(
              "receiverName",
              `${next.data.userDetails.firstName} ${next.data.userDetails.lastName}`
            );
            this.cookie.set("receiverId", `${next.data.userDetails.userId}`);
            this.cookie.set("authToken", `${next.data.authToken}`);
            this.userService.setUserInfo(next.data.userDetails);
            setTimeout(() => {
              this.router.navigate(["/chat"]);
            }, 1300);
          } else {
            this.toastr.success(next.message);
          }
        },
        error => {
          console.log(`TCL: LoginComponent -> onSubmit -> error`, error);
          this.toastr.error(`some unknown error occurred!!!`);
        }
      );
    }
  };

  goToSignUp = () => {
    this.router.navigate(["/signUp"]);
  };
}
