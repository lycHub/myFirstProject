import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {SingleCar} from '../carlist/carlist.component';
import {ActivatedRoute, Router} from '@angular/router';
import {Branch} from '../../service/company/branch-list.service';
import {Company} from '../../service/company/company-list.service';
import {CarConfig, CarConfigType} from "../../service/car/car-config/config.model";
import {isIncludes, swiper} from '../../util/public_fn';
import {Country} from "../../service/area/area-interface";
import {Subscription} from "rxjs/Subscription";
import {fromEvent} from "rxjs/observable/fromEvent";

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.scss']
})
export class CarDetailComponent implements OnInit, AfterViewInit, OnDestroy {
  // 广告
  ads: string | null;

  // 轮播索引
  imgIndex = 1;

  // 保存country
  country: Country;

  // 控制搜索表单的弹窗
  showSearchForm = false;

  // 控制取还车指南
  show_pr_rules = false;

  // 保存搜车信息
  search_data;

  // 保存车辆信息
  car_info: SingleCar;

  // 取车门店信息
  branch_info: Branch;

  // 公司信息
  company_info: Company;

  // 车辆评论数
  comment = 50;

  // 保存配置类型
  configType: CarConfigType[];

  // 保存所有配置
  save_config_all: CarConfig[];

  // 保存里程包信息
  save_package_info;

  // 保存用户选择的里程包
  save_user_package = [];

  // 总价格
  allPrice: number;


  // 返回loading
  private back$: Subscription;

  // 控制加载中
  showLoading = false;

  // 判断是否登录
  isLogin;

  // 取车门店地址
  address: string;

  constructor(private routeInfo: ActivatedRoute, private router: Router) {
    this.isLogin = window.sessionStorage.getItem('token');

    const car_detail = window.sessionStorage.getItem('car_detail');
    if (car_detail) {
      const car_info = JSON.parse(car_detail);
      this.car_info = car_info;
      this.allPrice = car_info.total;
    }

    this.routeInfo.data.subscribe(data => {
      [this.search_data, this.country, this.branch_info, this.company_info, this.save_package_info, this.configType, this.save_config_all] =
        [data.car_detail.searchData,
          data.car_detail.country,
          data.car_detail.branch,
          data.car_detail.company,
          data.car_detail.packages.result,
          data.carlist_data.configType,
          data.carlist_data.configs];

      this.ads = this.country.id === 2 ? '全网独家！超全面美国房车预订' : null;
      // console.log(this.branch_info);
      const addr = this.branch_info.address;
      if (!this.isLogin) {
        let index = null;
        if (isIncludes(addr, '市')) {
          index = addr.indexOf('市');
          this.address = addr.slice(0, index + 1) + '****';
        }else if (isIncludes(addr, '区')) {
          index = addr.indexOf('区');
          this.address = addr.slice(0, index + 1) + '****';
        }else {
          if (this.country.id === 1) {  // 国内
            this.address = addr.slice(0, 11) + '****';
          }else {
            this.address = addr;
          }
        }
      }else {
        this.address = addr;
      }

      // console.log(this.isLogin);
      // console.log(this.address);
      // console.log(this.save_package_info);

      // 修改套包数据结构
      if (this.save_package_info.company_package.length > 0) {
        this.save_package_info.company_package.map(item => {
          item.price += item.price * (this.car_info.tax / 100);
          return Object.assign(item, {count: 0, disabled: false, checked: false, pg_type: 'company'});
        });
      }else {
        this.save_package_info.company_package = null;
      }

      if (this.save_package_info.mileage_fee.length > 0) {
        this.save_package_info.mileage_fee.map(item => {
          item.price += item.price * (this.car_info.tax / 100);
          return Object.assign(item, {count: 0, disabled: false, checked: false, pg_type: 'mileage'});
        });
      }else {
        this.save_package_info.mileage_fee = null;
      }
    });
  }
  ngOnInit() {
    if (!this.back$) {
      this.back$ = fromEvent(window, 'popstate').subscribe(e => this.showLoading = true);
    }


    let math = Math.round(Math.random() * 10);
    if (math < 2) {
      math = 2;
    }else if (math > 6) {
      math = 6;
    }

    // 20~60
    this.comment = math * 10;
  }

  // 登录
  login() {
   this.router.navigate(['/login-phone', {loginTo: this.router.url, from: this.router.url}]);
  }


  // 点击直接添加的套包
  changeChecked(evt, changePack) {
    changePack.checked = evt;
    // console.log(this.save_package_info.mileage_fee);
    if (changePack.type === 'unlimited') {  // 无限里程包
      if (evt) {
        this.save_package_info.mileage_fee.map(item => {  // 将其它里程包禁用
          if (item.type !== 'unlimited') item.disabled = true;
        });

        if (this.save_user_package.length > 0) {
          this.save_user_package.map(item => {    // 改变已选套包的disabled价钱改为0
            if (item.pg_type === 'mileage' && item.type !== 'unlimited') {
              item.disabled = false;
              // [item.disabled, item.price] = [true, 0];
            }
          });
        }

        changePack.count = 1;
        this.save_user_package.push(changePack);
        this.allPrice = this.car_info.total;      // 初始化总价
        this.save_user_package.forEach(item => {  // 重新计算价格
          if (!item.disabled) this.allPrice += item.price * item.count;
        });
        // console.log(this.allPrice);
      }else { // 删除无限里程包，恢复其它里程包
        changePack.count = 0;
        const targetIndex = this.save_user_package.findIndex(item => item.name === changePack.name);
        if (targetIndex !== -1) {
          this.save_user_package.splice(targetIndex, 1);
          this.save_user_package.map(item => {    // 改变已选套包的disabled
            if (item.pg_type === 'mileage' && item.type !== 'unlimited') {
              item.disabled = false;
              // 要把价格为0的恢复原价
              // item.price = this.save_package_info.mileage_fee.find(key => key.id === item.id).price;
              // console.log(item.price);
              // console.log(item);
              // console.log(this.save_package_info.mileage_fee);
            }
          });
          this.save_package_info.mileage_fee.map(item => {  // 将其它里程包开启并恢复数量
            if (item.type !== 'unlimited') item.disabled = false;
          });
        }
        this.allPrice = this.car_info.total;      // 初始化总价
        this.save_user_package.forEach(item => {  // 重新计算价格
          if (!item.disabled) this.allPrice += item.price * item.count;
        });
      }
    }else if (changePack.type === 'combined') {  // 组合套包
      const package_included = changePack.package_include_list.split('，');
      let flag = false;

      if (evt) {  // 添加

        // 将包含的套包禁选
        this.save_package_info.company_package.map(item => {  // 禁选车行套包
          if (isIncludes(package_included, item.package_code)) {
            item.disabled = true;
          }
        })
        this.save_package_info.company_package.map(item => {  // 禁选里程包
          if (isIncludes(package_included, item.package_code) && item.type === 'unlimited') {
            flag = true;
            item.disabled = true;
          }
          if (flag) item.disabled = true;
        })

        if (this.save_user_package.length > 0) {
          this.save_user_package.map(item => {    // 改变已选套包的disabled
            if (isIncludes(package_included, item.package_code)) item.disabled = true;
            if (flag && item.pg_type === 'mileage') item.disabled = true;
          });
        }

        changePack.count = 1;
        this.save_user_package.push(changePack);
        this.allPrice = this.car_info.total;      // 初始化总价
        this.save_user_package.forEach(item => {  // 重新计算价格
          if (!item.disabled) this.allPrice += item.price * item.count;
        });

      }else { // 删除组合套餐，恢复之前已选套餐
        changePack.count = 0;
        const targetIndex = this.save_user_package.findIndex(item => item.name === changePack.name);
        if (targetIndex !== -1) {
          this.save_user_package.splice(targetIndex, 1);

          this.save_user_package.map(item => {    // 改变已选套包的disabled
            if (flag) {
              item.disabled = false;
            }else {
              if (isIncludes(package_included, item.package_code)) item.disabled = false;
            }
          });

          // 将包含的套包恢复
          this.save_package_info.company_package.map(item => {  // 恢复车行套包
            if (isIncludes(package_included, item.package_code)) item.disabled = false;
          });

          this.save_package_info.company_package.map(item => {  // 恢复里程包
            if (flag) {
              item.disabled = false;
            }else {
              if (isIncludes(package_included, item.package_code)) item.disabled = false;
            }
          });

          this.allPrice = this.car_info.total;      // 初始化总价
          this.save_user_package.forEach(item => {  // 重新计算价格
            if (!item.disabled) this.allPrice += item.price * item.count;
          });

        }

      }
    }else {
      /*普通套包*/
      if (evt) {
        changePack.count = 1;
        this.save_user_package.push(changePack);
        this.allPrice += changePack.price;
      }else {
        // 删除相应的套包item
        changePack.count = 0;
        const targetIndex = this.save_user_package.findIndex(item => item.name === changePack.name);
        if (targetIndex !== -1) {
          this.save_user_package.splice(targetIndex, 1);
          this.allPrice -= changePack.price;
        }
      }
    }

    // // console.log(this.save_package_info.company_package[index]);
    // // console.log(this.save_user_package);
  }

  // 改变按件计价的套包
  changeNum(evt, changePack, index) {
    switch (changePack.pg_type) {
      case 'company':
        // const pack = this.save_package_info.company_package[index];
        if (this.save_user_package.length === 0 && evt > 0) {
          changePack.count = evt;
          this.save_user_package.push(changePack);
          this.allPrice += changePack.price * changePack.count;
          // console.log(this.save_package_info.company_package[index]);
          // console.log(this.save_user_package);
          return;
        }


        const targetIndex_company = this.save_user_package.findIndex(item => item.name === changePack.name);

        if (evt > 0) {    // 如果修改后的数量>0
          if (targetIndex_company === -1) {   // 如果save_user_package中没有这一项，就加进去
            changePack.count = evt;
            this.save_user_package.push(changePack);
            this.allPrice += changePack.price * changePack.count;
          }else { // 如果save_user_package中有这一项，就改变该项的count
            const temp_count = evt - this.save_user_package[targetIndex_company].count;  // 改变前后的数量差
            this.save_user_package[targetIndex_company].count = evt;
            this.allPrice += changePack.price * temp_count;
          }
          // console.log(this.save_package_info.company_package[index]);
          // console.log(this.save_user_package);
        }else { // 如果修改后的数量<=0,就删除该项
          changePack.count = 0;
          this.save_user_package.splice(targetIndex_company, 1);
          this.allPrice -= changePack.price;
          // console.log(this.save_package_info.company_package[index]);
          // console.log(this.save_user_package);
        }
        break;
      case 'mileage':
        // const pack = this.save_package_info.mileage_fee[index];
        if (this.save_user_package.length === 0 && evt > 0) {
          changePack.count = evt;
          this.save_user_package.push(changePack);
          this.allPrice += changePack.price * changePack.count;
          // console.log(this.save_user_package);
          return;
        }


        const targetIndex_mileage = this.save_user_package.findIndex(item => item.name === changePack.name);

        if (evt > 0) {    // 如果修改后的数量>0
          if (targetIndex_mileage === -1) {   // 如果save_user_package中没有这一项，就加进去
            changePack.count = evt;
            this.save_user_package.push(changePack);
            this.allPrice += changePack.price * changePack.count;
            // console.log(this.save_user_package);
          }else { // 如果save_user_package中有这一项，就改变该项的count
            const temp_count = evt - this.save_user_package[targetIndex_mileage].count;  // 改变前后的数量差
            this.save_user_package[targetIndex_mileage].count = evt;
            this.allPrice += changePack.price * temp_count;
            // console.log(temp_count);
          }
          // console.log(this.save_user_package);
        }else { // 如果修改后的数量<=0,就删除该项
          changePack.count = 0;
          this.save_user_package.splice(targetIndex_mileage, 1);
          this.allPrice -= changePack.price;
          // console.log(this.save_user_package);
        }
        break;
    }
  }

  ngAfterViewInit(): void {


   const test = swiper('#carDetailCarousal', {
     loop: true,
     setWrapperSize : true,
     roundLengths : true,
     watchOverflow: true,
     runCallbacksOnInit : false,
     autoplay: true,
     navigation: {
       prevEl: '.swiper-button-leftCustom',
       nextEl: '.swiper-button-rightCustom'
     }
   });

   const that = this;
    test.on('slideChangeTransitionEnd', function () {
      //索引0开始
      that.imgIndex = this.realIndex + 1;
      // console.log(this.realIndex);
    });
  }

  ngOnDestroy(): void {
    this.back$.unsubscribe();
  }
}
