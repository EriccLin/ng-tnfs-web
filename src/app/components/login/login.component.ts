import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginData } from 'src/app/models/logindata';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login-component',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  // pw_pattern:string="/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{10,}$/";
  pw_pattern: string = "/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{10,}$/";
  public loginForm: FormGroup = new FormGroup({
    username: new FormControl('linjiayuan', { validators: [Validators.min(5), Validators.max(15), Validators.pattern('^[a-zA-Z0-9-_]{0,20}')], updateOn: 'change' }),
    password: new FormControl('123456', { validators: [Validators.min(0), Validators.max(15)], updateOn: 'blur' })
  });
  checkValidation: boolean = false;

  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
    $('#icon-pw').on('click', function () {
      let elemInput = $('#password');
      $(this).removeClass();
      if (elemInput.prop('type') == "password") {
        elemInput.prop('type', 'text');
        $(this).addClass('uil uil-eye show-hide-pw');
      } else {
        elemInput.prop('type', 'password');
        $(this).addClass('uil uil-eye-slash show-hide-pw');
      }
    });
  }
  onCheckValidation() {
    let elem1 = this.loginForm.controls['username'];
    let elem2 = this.loginForm.controls['password'];
    let flag1 = elem1.invalid && (elem1.dirty || elem1.touched);
    let flag2 = elem2.invalid && (elem2.dirty || elem2.touched);
    console.log(flag1)
    this.checkValidation = flag1 || flag2;
  }
  onSubmit() {
    this.onCheckValidation();
    if (!this.checkValidation) {
      console.log('login form value: ', this.loginForm.value)
      let val = this.loginForm.value;
      let logindata = new LoginData(val.username, val.password);
      this.authService.login(logindata);
    }
  }
}


// export class LoginComponent implements OnInit {
//   // subject: BehaviorSubject<any> = new BehaviorSubject(0);
//   // sub1;//: any;
//   // source!: Observable<any>;
//   ngOnInit(): void {
//     this.subject.next(1);
//     this.subject.next(2);
//     this.sub1 = this.subject.subscribe({ next: (val: any) => console.log('observerA: ' + val) });
//     this.source = interval(1000).pipe(take(5)).pipe<number>(

//       // filter((x: number) => x % 2 === 0)
//       scan((acc: number, x: number) => acc + x)
//     );
//     this.source.subscribe(v => console.log(v));
//     const source1 = from(['a', 'b', 'c', 'd', 'e', 'f']);
//     const source2 = interval(1000).pipe(take(5));
//     // source1.pipe(zipWith(source2)).subscribe((x) => console.log(x));
//     forkJoin([source1, source2]).subscribe((x) => console.log(x));
//     let g = { name: 'Mary', age: 38, title: 'Engineer' };
//     // let h = Object.assign({}, g, { title: 'Manager' });
//     let h = { ...g, title: 'Manager' };
//     console.log(g);
//     console.log(h);

//     interface Action {
//       type: string;
//       payload?: any;
//     }
//     class Dispatcher extends Subject<Action> {
//       dispatch(action: Action) {
//         // console.log('got dispatch action ', action.type);
//         this.next(action);
//       }
//     }
//     // const dispatcher = new Dispatcher();
//     // const sub1 = dispatcher.subscribe(v => console.log('sub1 ===> ', v));
//     // const sub2 = dispatcher.subscribe(v => console.log('sub2 ===> ', v));
//     // dispatcher.dispatch({ type: 'Action1' })
//     // dispatcher.dispatch({ type: 'Action2' })

//     // reducer
//     const message_func = (state: any[] = [], action: Action) => {
//       switch (action.type) {
//         case 'ADD_MESSAGE':
//           return [...state, action.payload];
//         case 'REMOVE_MESSAGE':
//           return state.filter(msg => msg.id != action.payload);
//         default:
//           return state;
//       }
//     }

//     class Store extends BehaviorSubject<Action[]> {
//       constructor(private dispatcher: Dispatcher, private reducer, initialState) {
//         super(initialState)
//         this.dispatcher
//           // .pipe(tap(value => console.log(`do some effect for: ${value.type}`)))
//           // .pipe(tap(value => console.log(`doing reducer here, got new state after: ${value.type}`)))
//           .pipe(scan((acc, v) => this.reducer(acc, v), initialState))
//           .subscribe(state => super.next(state))
//       }
//       dispatch(action: Action) {
//         this.dispatcher.dispatch(action)
//       }
//       // override next to allow store subscribe action$
//       override next(action) {
//         this.dispatcher.dispatch(action)
//       }
//     }

//     const initialState = []
//     const dispatcher = new Dispatcher();
//     const store = new Store(dispatcher, message_func, initialState);
//     const sub1 = store.subscribe(actions => console.log(actions))

//     store.dispatch({ type: 'ADD_MESSAGE', payload: { id: 1, message: 'First Message' } })
//     store.dispatch({ type: 'ADD_MESSAGE', payload: { id: 2, message: 'Second Message' } })
//     store.dispatch({ type: 'REMOVE_MESSAGE', payload: 2 })
//     store.dispatch({ type: 'ADD_MESSAGE', payload: { id: 3, message: 'Third Message' } })
//   }

//   // sub2 = this.subject.subscribe({ next: (val: any) => console.log('observerB: ' + val) });

//   // this.subject.next(2);


//   // observable$ = new Observable(function (observer: any) {
//   //   observer.next(1);
//   //   observer.next(2);
//   //   observer.next(3);
//   //   observer.error(new Error('error: error message'));
//   //   setTimeout(() => {
//   //     observer.next(4);
//   //     observer.complete();
//   //   }, 1000);
//   // });
//   // observer = {
//   //   next: (val: any) => {
//   //     console.log(val)
//   //   },
//   //   error: (err: any) => {
//   //     console.log(err);
//   //   },
//   //   complete: () => {
//   //     console.log('completed');
//   //   }
//   // };
//   // obs = this.observable$.subscribe(this.observer);
// }
