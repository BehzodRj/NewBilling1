import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RequestsService } from '../all.service';
import jwt_decode from "jwt-decode";

@Component({
  selector: 'app-accaunts-page',
  templateUrl: './accaunts-page.component.html',
  styleUrls: ['./accaunts-page.component.scss'],
})
export class AccauntsPageComponent implements OnInit {
  tarifsData: any = []
  servicesData: any = []
  paymentData: any = []
  creditData: any = []
  servicesLinkData: any = []
  addServiceForm!: FormGroup
  addPaymentForm!: FormGroup
  addCreditForm!: FormGroup
  editCreditForm!: FormGroup
  accountsData: any = []
  accountsAddForm!: FormGroup
  accountsEditForm!: FormGroup
  accountsFilterForm!: FormGroup
  page: any
  search: any
  addTable = false
  editTable = false
  tableId: any
  isLoading = false
  uslugiModal = false
  paymentModal = false
  creditModal = false
  editCredit = false
  permitActions = true
  serviceId: any
  numAccounts: any = 0

  constructor(private request: RequestsService) {}

  ngOnInit() {
    if(localStorage.getItem('isDark')) {
      document.body.classList.remove('dark-theme')
    } else if(!localStorage.getItem('isDark')) {
      document.body.classList.toggle('dark-theme')
    }
    this.accountsFilterForm = new FormGroup({
      id: new FormControl('', Validators.required),    
      fio: new FormControl('', Validators.required),
      tarif_id: new FormControl('', Validators.required),
      speed_cf: new FormControl('', Validators.required),
      phone_number: new FormControl('', Validators.required),
      ipaddress: new FormControl('', Validators.required),
      acc_info: new FormControl('', Validators.required),
      passport: new FormControl('', Validators.required),
      age: new FormControl('', Validators.required),
      gender: new FormControl('', Validators.required),
      overdraft: new FormControl('', Validators.required),
      customr_type: new FormControl('', Validators.required),
      comment: new FormControl('', Validators.required),
      status: new FormControl('', Validators.required),
      start_create: new FormControl('', Validators.required),
      end_create: new FormControl('', Validators.required),
      start_date: new FormControl('', Validators.required),
      end_date: new FormControl('', Validators.required),
    })

    this.accountsAddForm = new FormGroup({
      fio: new FormControl('', Validators.required),
      tarif_id: new FormControl('', Validators.required),
      price_cf: new FormControl(1, Validators.required),
      speed_cf: new FormControl(1, Validators.required),
      phone_number: new FormControl('', [Validators.required, Validators.minLength(12), Validators.maxLength(12)]),
      end_date: new FormControl('', Validators.required),
      ipaddress1: new FormControl('', Validators.required),
      ipaddress2: new FormControl('', Validators.required),
      ipaddress3: new FormControl('', Validators.required),
      ipaddress4: new FormControl('', Validators.required),
      acc_info: new FormControl(''),
      passport: new FormControl(''),
      age: new FormControl('', Validators.required),
      gender: new FormControl('M'),
      overdraft: new FormControl(1, Validators.required),
      customr_type: new FormControl('B2C', Validators.required),
      comment: new FormControl(''),
    })

    this.accountsEditForm = new FormGroup({
      fio: new FormControl('', Validators.required),
      tarif_id: new FormControl('', Validators.required),
      price_cf: new FormControl(1, Validators.required),
      speed_cf: new FormControl(1, Validators.required),
      phone_number: new FormControl('', Validators.required),
      end_date: new FormControl('', Validators.required),
      ipaddress1: new FormControl('', Validators.required),
      ipaddress2: new FormControl('', Validators.required),
      ipaddress3: new FormControl('', Validators.required),
      ipaddress4: new FormControl('', Validators.required),
      acc_info: new FormControl(''),
      passport: new FormControl(''),
      age: new FormControl('', Validators.required),
      gender: new FormControl(''),
      overdraft: new FormControl(''),
      customr_type: new FormControl('', Validators.required),
      comment: new FormControl(''),
    })

    this.addServiceForm = new FormGroup({
      created_at: new FormControl('', Validators.required),
      name: new FormControl('1', Validators.required)
    })


    this.addPaymentForm = new FormGroup({
      summa: new FormControl('', Validators.required),
      comment: new FormControl('')
    })

    this.addCreditForm = new FormGroup({
      comment: new FormControl(''),
      expire_at: new FormControl('')
    })

    // this.isLoading = true
    // this.request.getAccountsRequest().subscribe( (response: any) => {
    //   this.accountsData = response
    //   this.isLoading = false
    // }, error => {
    //   this.isLoading = false
    //   alert(error.error.Error)
    //    if(error.status == 401) {
    //     this.request.refreshRequest(localStorage.getItem('refresh_token')).subscribe( (response: any) => {
    //       localStorage.setItem('access_token', response.access_token)
    //       this.isLoading = false
    //       location.reload()
    //     })
    //   }
    // })

    this.request.getTarifsRequest().subscribe( (response: any) => {
      this.tarifsData = response
    }, error => {
       if(error.status == 401) {
        this.request.refreshRequest(localStorage.getItem('refresh_token')).subscribe( (response: any) => {
          localStorage.setItem('access_token', response.access_token)
          localStorage.setItem('refresh_token', response.refresh_token)
          this.isLoading = false
          location.reload()
        }, error => {
          localStorage.clear()
          location.reload()
        })
      }
    })

    var token: any = localStorage.getItem('access_token')
    var decoded: any = jwt_decode(token);
    console.log(decoded);

    if (decoded.user_role == 'admin') {
      this.permitActions = true
    } else if (decoded.user_role == 'sales') {
      this.permitActions = false
    }

  }
  ipadress1(){
    let ipaddress1 = this.accountsAddForm.value.ipaddress1
    let ipaddressEdit1 = this.accountsEditForm.value.ipaddress1

    if(ipaddress1*1>255){
      this.accountsAddForm.controls['ipaddress1'].setValue("255")
    }
    if(ipaddressEdit1*1>255){
      this.accountsEditForm.controls['ipaddress1'].setValue("255")
    }
    // if(a.length>2){
    // }
  }
  ipadress2(){
    let ipaddress2 = this.accountsAddForm.value.ipaddress2
    let ipaddressEdit2 = this.accountsEditForm.value.ipaddress2


    if(ipaddress2*1>255){
      this.accountsAddForm.controls['ipaddress2'].setValue("255")
    }
    if(ipaddressEdit2*1>255){
      this.accountsEditForm.controls['ipaddress2'].setValue("255")
    }
    // if(a.length>2){
    // }
  }
  ipadress3(){
    let ipaddress3 = this.accountsAddForm.value.ipaddress3
    let ipaddressEdit3 = this.accountsEditForm.value.ipaddress3


    if(ipaddress3*1>255){
      this.accountsAddForm.controls['ipaddress3'].setValue("255")
    }
    if(ipaddressEdit3*1>255){
      this.accountsEditForm.controls['ipaddress3'].setValue("255")
    }
    // if(a.length>2){
    // }
  }
  ipadress4(){
    let ipaddress4 = this.accountsAddForm.value.ipaddress4
    let ipaddressEdit4 = this.accountsEditForm.value.ipaddress4

    if(ipaddress4*1>255){
      this.accountsAddForm.controls['ipaddress4'].setValue("255")
    }
    if(ipaddressEdit4*1>255){
      this.accountsEditForm.controls['ipaddress4'].setValue("255")
    }
    // if(a.length>2){
    // }
  }
  filterTable() {
    const accountsFilterFormData = {...this.accountsFilterForm.value}
    if( (accountsFilterFormData.start_create && accountsFilterFormData.end_create) && (accountsFilterFormData.start_date && accountsFilterFormData.end_date)) {
      var start_create: any = new Date(accountsFilterFormData.start_create)
      var end_create: any = new Date(accountsFilterFormData.end_create)
      var start_date: any = new Date(accountsFilterFormData.start_date)
      var end_date: any = new Date(accountsFilterFormData.end_date)
      this.isLoading = true
      this.request.getFilterAccountsRequest(accountsFilterFormData.id, accountsFilterFormData.fio, accountsFilterFormData.tarif_id, accountsFilterFormData.speed_cf, accountsFilterFormData.phone_number, accountsFilterFormData.ipaddress, accountsFilterFormData.acc_info, accountsFilterFormData.passport, accountsFilterFormData.age, accountsFilterFormData.gender, accountsFilterFormData.overdraft, accountsFilterFormData.customr_type, accountsFilterFormData.comment, accountsFilterFormData.status, start_create.toLocaleDateString().split('.').reverse().join('.'), end_create.toLocaleDateString().split('.').reverse().join('.'), start_date.toLocaleDateString().split('.').reverse().join('.'), end_date.toLocaleDateString().split('.').reverse().join('.')).subscribe(response => {
        this.accountsData = response
        this.isLoading = false
        this.numAccounts = this.accountsData.length
      }, error => {
        this.isLoading = false
         if(error.status == 401) {
          this.request.refreshRequest(localStorage.getItem('refresh_token')).subscribe( (response: any) => {
            localStorage.setItem('access_token', response.access_token)
            localStorage.setItem('refresh_token', response.refresh_token)
            this.isLoading = false
            location.reload()
          })
        }
      })
    } else if (accountsFilterFormData.start_create && accountsFilterFormData.end_create) {
        this.isLoading = true
        var start_create: any = new Date(accountsFilterFormData.start_create)
        var end_create: any = new Date(accountsFilterFormData.end_create)
        this.request.getFilterAccountsRequest(accountsFilterFormData.id, accountsFilterFormData.fio, accountsFilterFormData.tarif_id, accountsFilterFormData.speed_cf, accountsFilterFormData.phone_number, accountsFilterFormData.ipaddress, accountsFilterFormData.acc_info, accountsFilterFormData.passport, accountsFilterFormData.age, accountsFilterFormData.gender, accountsFilterFormData.overdraft, accountsFilterFormData.customr_type, accountsFilterFormData.comment, accountsFilterFormData.status, start_create.toLocaleDateString().split('.').reverse().join('.'), end_create.toLocaleDateString().split('.').reverse().join('.'), '', '').subscribe(response => {
          this.accountsData = response
          this.isLoading = false
          this.numAccounts = this.accountsData.length
        }, error => {
          this.isLoading = false
           if(error.status == 401) {
            this.request.refreshRequest(localStorage.getItem('refresh_token')).subscribe( (response: any) => {
              localStorage.setItem('access_token', response.access_token)
              localStorage.setItem('refresh_token', response.refresh_token)
              this.isLoading = false
              location.reload()
            }, error => {
              localStorage.clear()
              location.reload()
            })
          }
        })
    } else if (accountsFilterFormData.start_date && accountsFilterFormData.end_date) {
        this.isLoading = true
        var start_date: any = new Date(accountsFilterFormData.start_date)
        var end_date: any = new Date(accountsFilterFormData.end_date)
        this.request.getFilterAccountsRequest(accountsFilterFormData.id, accountsFilterFormData.fio, accountsFilterFormData.tarif_id, accountsFilterFormData.speed_cf, accountsFilterFormData.phone_number, accountsFilterFormData.ipaddress, accountsFilterFormData.acc_info, accountsFilterFormData.passport, accountsFilterFormData.age, accountsFilterFormData.gender, accountsFilterFormData.overdraft, accountsFilterFormData.customr_type, accountsFilterFormData.comment, accountsFilterFormData.status, '', '', start_date.toLocaleDateString().split('.').reverse().join('.'), end_date.toLocaleDateString().split('.').reverse().join('.')).subscribe(response => {
          this.accountsData = response
          this.isLoading = false
          this.numAccounts = this.accountsData.length
        }, error => {
          this.isLoading = false
           if(error.status == 401) {
            this.request.refreshRequest(localStorage.getItem('refresh_token')).subscribe( (response: any) => {
              localStorage.setItem('access_token', response.access_token)
              localStorage.setItem('refresh_token', response.refresh_token)
              this.isLoading = false
              location.reload()
            }, error => {
              localStorage.clear()
              location.reload()
            })
          }
        })
    } else {
        this.isLoading = true
        this.request.getFilterAccountsRequest(accountsFilterFormData.id, accountsFilterFormData.fio, accountsFilterFormData.tarif_id, accountsFilterFormData.speed_cf, accountsFilterFormData.phone_number, accountsFilterFormData.ipaddress, accountsFilterFormData.acc_info, accountsFilterFormData.passport, accountsFilterFormData.age, accountsFilterFormData.gender, accountsFilterFormData.overdraft, accountsFilterFormData.customr_type, accountsFilterFormData.comment, accountsFilterFormData.status, '', '', '', '').subscribe(response => {
          this.accountsData = response
          this.isLoading = false
          this.numAccounts = this.accountsData.length
        }, error => {
          this.isLoading = false
           if(error.status == 401) {
            this.request.refreshRequest(localStorage.getItem('refresh_token')).subscribe( (response: any) => {
              localStorage.setItem('access_token', response.access_token)
              localStorage.setItem('refresh_token', response.refresh_token)
              this.isLoading = false
              location.reload()
            }, error => {
              localStorage.clear()
              location.reload()
            })
          }
        })
    }
  }

  addNewTable() {
    const accountsAddFormData = {...this.accountsAddForm.value}
    if(this.accountsAddForm.controls['ipaddress1'].value > 255 || this.accountsAddForm.controls['ipaddress2'].value > 255 || this.accountsAddForm.controls['ipaddress3'].value > 255 || this.accountsAddForm.controls['ipaddress4'].value > 255) {
      alert('Максимальное значение IP адресса не может превышать число 255')
    } else if( (this.accountsAddForm.controls['ipaddress1'].value == 255 && this.accountsAddForm.controls['ipaddress2'].value == 255 && this.accountsAddForm.controls['ipaddress3'].value == 255 && this.accountsAddForm.controls['ipaddress4'].value == 255) ) {
      alert('В IP адрессе не может быть 4 числа 255')
    } else {
      this.isLoading = true
      let ip_adress = `${this.accountsAddForm.controls['ipaddress1'].value}.${this.accountsAddForm.controls['ipaddress2'].value}.${this.accountsAddForm.controls['ipaddress3'].value}.${this.accountsAddForm.controls['ipaddress4'].value}`
      let age = new Date(accountsAddFormData.age)
      let end_date = new Date(accountsAddFormData.end_date)
      this.request.postAccountsRequest(accountsAddFormData.fio, accountsAddFormData.tarif_id, accountsAddFormData.price_cf, accountsAddFormData.speed_cf, accountsAddFormData.phone_number, end_date.toISOString(), ip_adress, accountsAddFormData.acc_info, accountsAddFormData.passport, age.toISOString(), accountsAddFormData.gender, parseInt(accountsAddFormData.overdraft), accountsAddFormData.customr_type, accountsAddFormData.comment).subscribe(response => {
        this.isLoading = false
        location.reload()
      }, error => {
        this.isLoading = false
        alert(error.error.Error)
      })
    }
  }

  openEditTable(id: number) {
    this.tableId = id
    this.editTable = true
    this.accountsEditForm.patchValue(this.accountsData.filter( (res: any) => res.id ==  id)[0])
    let age = new Date(this.accountsData.filter( (res: any) => res.id ==  id)[0].age)
    let ageFormat = age.toLocaleDateString().split('.')
    this.accountsEditForm.controls['age'].patchValue(`${ageFormat[2]}-${ageFormat[1]}-${ageFormat[0]}`)
    let end_date = new Date(this.accountsData.filter( (res: any) => res.id ==  id)[0].end_date)
    let endDateFormat = end_date.toLocaleDateString().split('.')
    this.accountsEditForm.controls['end_date'].patchValue(`${endDateFormat[2]}-${endDateFormat[1]}-${endDateFormat[0]}`)
    let ip_adress = this.accountsData.filter( (res: any) => res.id ==  id)[0].ipaddress.split('.')
    this.accountsEditForm.controls['ipaddress1'].patchValue(ip_adress[0])
    this.accountsEditForm.controls['ipaddress2'].patchValue(ip_adress[1])
    this.accountsEditForm.controls['ipaddress3'].patchValue(ip_adress[2])
    this.accountsEditForm.controls['ipaddress4'].patchValue(ip_adress[3])
  }

  editNewTable() {
    const accountsEditFormData = {...this.accountsEditForm.value}
    if(this.accountsEditForm.controls['ipaddress1'].value > 255 || this.accountsEditForm.controls['ipaddress2'].value > 255 || this.accountsEditForm.controls['ipaddress3'].value > 255 || this.accountsEditForm.controls['ipaddress4'].value > 255) {
      alert('Максимальное значение IP адресса не может превышать число 255')
    } else if( (this.accountsEditForm.controls['ipaddress1'].value == 255 && this.accountsEditForm.controls['ipaddress2'].value == 255 && this.accountsEditForm.controls['ipaddress3'].value == 255 && this.accountsEditForm.controls['ipaddress4'].value == 255) ) {
      alert('В IP адрессе не может быть 4 числа 255')
    } else {
      this.isLoading = true
      let ip_adress = `${this.accountsEditForm.controls['ipaddress1'].value}.${this.accountsEditForm.controls['ipaddress2'].value}.${this.accountsEditForm.controls['ipaddress3'].value}.${this.accountsEditForm.controls['ipaddress4'].value}`
      let age = new Date(accountsEditFormData.age)
      let end_date = new Date(accountsEditFormData.end_date)
      this.request.putAccountsRequest(this.tableId, accountsEditFormData.fio, accountsEditFormData.tarif_id, accountsEditFormData.price_cf, accountsEditFormData.speed_cf, accountsEditFormData.phone_number, end_date.toISOString(), ip_adress, accountsEditFormData.acc_info, accountsEditFormData.passport, age.toISOString(), accountsEditFormData.gender, parseInt(accountsEditFormData.overdraft), accountsEditFormData.customr_type, accountsEditFormData.comment).subscribe(response => {
        this.isLoading = false
        location.reload()
      }, error => {
        this.isLoading = false
        alert(error.error.Error)
    })
    }
  }

  deleteTable(id: number) {
    this.isLoading = true
    let deleteConf = confirm("Вы уверени что хотите удалить данный Лицевой Счёт: " + id)
    if(deleteConf == true) {
      this.request.deleteAccountsRequest(id).subscribe(response => {
        this.isLoading = false
        location.reload()
      }, error => {
        this.isLoading = false
        alert(error.error.Error)
      })
    } else {
      this.isLoading = false
    }
  }

  openUslugiModal(id: any) {
    this.serviceId = id
    this.uslugiModal = true
    this.isLoading = true
    this.request.getServiceLinkRequest(id).subscribe( (response: any) => {
      this.servicesLinkData = response
      this.isLoading = false
    }, error => {
      this.isLoading = false
      alert(error.error.Error)
       if(error.status == 401) {
        this.request.refreshRequest(localStorage.getItem('refresh_token')).subscribe( (response: any) => {
          localStorage.setItem('access_token', response.access_token)
          localStorage.setItem('refresh_token', response.refresh_token)
          this.isLoading = false
          location.reload()
        })
      }
    })

    this.request.getServicesRequest().subscribe( (response: any) => {
      this.servicesData = response
      this.isLoading = false
    }, error => {
      this.isLoading = false
      alert(error.error.Error)
       if(error.status == 401) {
        this.request.refreshRequest(localStorage.getItem('refresh_token')).subscribe( (response: any) => {
          localStorage.setItem('access_token', response.access_token)
          localStorage.setItem('refresh_token', response.refresh_token)
          this.isLoading = false
          location.reload()
        })
      }
    })
  }

  
  addNewService() {
    const addServiceFormData = {...this.addServiceForm.value}
    this.isLoading = true
    let created_at = new Date(addServiceFormData.created_at)
    this.request.posServiceLinkRequest(this.serviceId, created_at.toISOString(), addServiceFormData.name).subscribe(response => {
      this.isLoading = false
      this.request.getServiceLinkRequest(this.serviceId).subscribe(response => {
        this.servicesLinkData = response
      })
    }, error => {
      this.isLoading = false
      alert(error.error.Error)
    })
  }

  deleteService(id: any) {
    this.isLoading = true
    let deleteConf = confirm("Вы уверени что хотите удалить данный Лицевой Счёт: " + id)
    if(deleteConf == true) {
      this.request.deleteServiceLinkRequest(id).subscribe(response => {
        this.isLoading = false
        this.request.getServiceLinkRequest(this.serviceId).subscribe(response => {
          this.servicesLinkData = response
        })
      }, error => {
        this.isLoading = false
        alert(error.error.Error)
      })
    } else {
      this.isLoading = false
    }
  }

  openPaymentModal(id: any) {
    this.serviceId = id
    this.paymentModal = true
  }
  
  addNewPayment() {
    const addPaymentFormData = {...this.addPaymentForm.value}
    this.isLoading = true
    this.request.postTransactions2Request(this.serviceId, addPaymentFormData.summa, addPaymentFormData.comment).subscribe(response => {
      this.isLoading = false
      location.reload()
    }, error => {
      this.isLoading = false
      alert(error.error.Error)
    })
  }

  openCreditModal(id: any) {
    this.serviceId = id
    this.creditModal = true
    this.isLoading = true
    this.request.getCreditRequest().subscribe( (response: any) => {
      this.creditData = response
      this.isLoading = false
    }, error => {
      this.isLoading = false
      alert(error.error.Error)
       if(error.status == 401) {
        this.request.refreshRequest(localStorage.getItem('refresh_token')).subscribe( (response: any) => {
          localStorage.setItem('access_token', response.access_token)
          localStorage.setItem('refresh_token', response.refresh_token)
          this.isLoading = false
          location.reload()
        })
      }
    })
  }

  addNewCredit() {
    const addCreditFormData = {...this.addCreditForm.value}
    this.isLoading = true
    let expire_at = new Date(addCreditFormData.expire_at)
    this.request.postCreditRequest(this.serviceId, addCreditFormData.comment, expire_at.toISOString()).subscribe(response => {
      this.isLoading = false
      this.request.getCreditRequest().subscribe( (response: any) => {
        this.creditData = response
      })
    }, error => {
      this.isLoading = false
      alert(error.error.Error)
    })
  }

  changeCredit(id: number) {
    this.editCredit = true
    let creditDataById = this.creditData.filter( (res: any) => res.id == id )[0]
    this.addCreditForm.patchValue(creditDataById)
    let expire_at = new Date(creditDataById.expire_at)
    let expire_atFormat = expire_at.toLocaleDateString().split('.')
    this.addCreditForm.controls['expire_at'].patchValue(`${expire_atFormat[2]}-${expire_atFormat[1]}-${expire_atFormat[0]}`)
    this.serviceId = creditDataById.id
  }

  addEditCredit() {
    const addCreditFormData = {...this.addCreditForm.value}
    this.isLoading = true
    let expire_at = new Date(addCreditFormData.expire_at)
    this.request.putCreditRequest(this.serviceId, this.serviceId, addCreditFormData.comment, expire_at.toISOString()).subscribe(response => {
      this.isLoading = false
      this.request.getCreditRequest().subscribe( (response: any) => {
        this.creditData = response
        this.editCredit = false
        this.addCreditForm.reset()
      })
    }, error => {
      this.isLoading = false
      alert(error.error.Error)
    })
  }

  refreshAccount(id: number) {
    this.isLoading = true
    this.request.getAccountRefresh(id).subscribe(response => {
      this.isLoading = false
      location.reload()
    }, error => {
      this.isLoading = false
      alert(error.error.Error)
    })
  }

  lockAccountOff(id: number) {
    this.isLoading = true
    this.request.getAccountBlockOff(id).subscribe(response => {
      this.isLoading = false
      location.reload()
    }, error => {
      this.isLoading = false
      alert(error.error.Error)
    })
  }
  lockAccountOn(id: number) {
    this.isLoading = true
    this.request.getAccountBlockOn(id).subscribe(response => {
      this.isLoading = false
      location.reload()
    }, error => {
      this.isLoading = false
      alert(error.error.Error)
    })
  }

}
