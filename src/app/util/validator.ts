import {FormControl, FormGroup} from '@angular/forms';
export function validPhone(control: FormControl): {[key: string]: any} | null {
  const patten = /^(19[0|1|2|3|5|6|7|8|9]|16[0|1|2|3|5|6|7|8|9]|13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/;
  return patten.test(control.value) ? null : {mobile: {phoneError: '电话格式不正确'}};
}

export function validPassRroup(group: FormGroup): {[key: string]: any} | null {
  const pwd1 = group.get('pwd1').value;
  const pwd2 = group.get('pwd2').value;
  return pwd1 === pwd2 ? null : {passRroup: {errorMsg: '两次密码不一致'}};
}
