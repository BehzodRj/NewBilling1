import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { RequestsService } from '../all.service';
import jwt_decode from "jwt-decode";
import * as XLSX from 'xlsx'; 

@Component({
  selector: 'app-accaunts-page',
  templateUrl: './accaunts-page.component.html',
  styleUrls: ['./accaunts-page.component.scss'],
})
export class AccauntsPageComponent implements OnInit {
  accountsData: any = []
  report1Data: any = []
  report2Data: any = []
  report3Data: any = []
  tarifsData: any = []
  servicesData: any = []
  paymentData: any = []
  creditData: any = []
  servicesLinkData: any = []
  additionalIpData: any = []
  additionalInfoData: any = []
  fireWallData: any = []
  fireWall4Table: any = []
  accountsAddForm!: UntypedFormGroup
  accountsEditForm!: UntypedFormGroup
  accountsFilterForm!: UntypedFormGroup
  addServiceForm!: UntypedFormGroup
  addPaymentForm!: UntypedFormGroup
  addCreditForm!: UntypedFormGroup
  addAdditionalIpForm!: UntypedFormGroup
  addAdditionalInfoForm!: UntypedFormGroup
  addExtandsForm!: UntypedFormGroup
  addTable = false
  editTable = false
  isLoading = false
  uslugiModal = false
  paymentModal = false
  creditModal = false
  editCredit = false
  additionalIpModal = false
  additionalInfoModal = false
  extandsModal = false
  editAdditionalInfo = false
  permitActions = true
  tableId: any
  page: any
  search: any
  serviceId: any
  numAccounts: any = 0
  usersData: any = []
  fileName: any; 

  constructor(private request: RequestsService) {}

  ngOnInit() {
    if(localStorage.getItem('isDark')) {
      document.body.classList.remove('dark-theme')
    } else if(!localStorage.getItem('isDark')) {
      document.body.classList.toggle('dark-theme')
    }
    this.accountsFilterForm = new UntypedFormGroup({
      id: new UntypedFormControl('', Validators.required),    
      fio: new UntypedFormControl('', Validators.required),
      tarif_id: new UntypedFormControl('', Validators.required),
      speed_cf: new UntypedFormControl('', Validators.required),
      phone_number: new UntypedFormControl('', Validators.required),
      ipaddress: new UntypedFormControl('', Validators.required),
      acc_info: new UntypedFormControl('', Validators.required),
      conf_firewall_id: new UntypedFormControl('', Validators.required),
      passport: new UntypedFormControl('', Validators.required),
      age: new UntypedFormControl('', Validators.required),
      gender: new UntypedFormControl('', Validators.required),
      overdraft: new UntypedFormControl('', Validators.required),
      customr_type: new UntypedFormControl('', Validators.required),
      comment: new UntypedFormControl('', Validators.required),
      status: new UntypedFormControl('', Validators.required),
      start_create: new UntypedFormControl('', Validators.required),
      end_create: new UntypedFormControl('', Validators.required),
      start_date: new UntypedFormControl('', Validators.required),
      end_date: new UntypedFormControl('', Validators.required),
      connect_by: new UntypedFormControl('', Validators.required),
      contact_by: new UntypedFormControl('', Validators.required),
      page_size: new UntypedFormControl('', Validators.required)
    })

    this.accountsAddForm = new UntypedFormGroup({
      fio: new UntypedFormControl('', Validators.required),
      tarif_id: new UntypedFormControl('', Validators.required),
      price_cf: new UntypedFormControl(1, Validators.required),
      speed_cf: new UntypedFormControl(1, Validators.required),
      phone_number: new UntypedFormControl('', [Validators.required, Validators.minLength(12), Validators.maxLength(12)]),
      end_date: new UntypedFormControl('', Validators.required),
      ipaddress1: new UntypedFormControl('', Validators.required),
      ipaddress2: new UntypedFormControl('', Validators.required),
      ipaddress3: new UntypedFormControl('', Validators.required),
      ipaddress4: new UntypedFormControl('', Validators.required),
      acc_info: new UntypedFormControl(''),
      conf_firewall_id: new UntypedFormControl(''),
      passport: new UntypedFormControl(''),
      age: new UntypedFormControl('', Validators.required),
      gender: new UntypedFormControl('M'),
      overdraft: new UntypedFormControl(1, Validators.required),
      customr_type: new UntypedFormControl('B2C', Validators.required),
      comment: new UntypedFormControl(''),
      connect_by: new UntypedFormControl('', Validators.required),
      contact_by: new UntypedFormControl('', Validators.required),
    })

    this.accountsEditForm = new UntypedFormGroup({
      fio: new UntypedFormControl('', Validators.required),
      tarif_id: new UntypedFormControl('', Validators.required),
      price_cf: new UntypedFormControl(1, Validators.required),
      speed_cf: new UntypedFormControl(1, Validators.required),
      phone_number: new UntypedFormControl('', Validators.required),
      end_date: new UntypedFormControl('', Validators.required),
      ipaddress1: new UntypedFormControl('', Validators.required),
      ipaddress2: new UntypedFormControl('', Validators.required),
      ipaddress3: new UntypedFormControl('', Validators.required),
      ipaddress4: new UntypedFormControl('', Validators.required),
      acc_info: new UntypedFormControl(''),
      conf_firewall_id: new UntypedFormControl(''),
      passport: new UntypedFormControl(''),
      age: new UntypedFormControl('', Validators.required),
      gender: new UntypedFormControl(''),
      overdraft: new UntypedFormControl(''),
      customr_type: new UntypedFormControl('', Validators.required),
      comment: new UntypedFormControl(''),
      connect_by: new UntypedFormControl('', Validators.required),
      contact_by: new UntypedFormControl('', Validators.required),
    })

    this.addServiceForm = new UntypedFormGroup({
      created_at: new UntypedFormControl('', Validators.required),
      name: new UntypedFormControl('1', Validators.required)
    })


    this.addPaymentForm = new UntypedFormGroup({
      summa: new UntypedFormControl('', Validators.required),
      comment: new UntypedFormControl('')
    })

    this.addCreditForm = new UntypedFormGroup({
      comment: new UntypedFormControl(''),
      expire_at: new UntypedFormControl('')
    })

    this.addAdditionalIpForm = new UntypedFormGroup({
      ip: new UntypedFormControl(''),
    })

    this.addAdditionalInfoForm = new UntypedFormGroup({
      ip: new UntypedFormControl(''),
    })

    this.addExtandsForm = new UntypedFormGroup({
      end_date: new UntypedFormControl('', Validators.required),
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

    this.request.getFilterUsersRequest('', '', '').subscribe( (response: any) => {
      this.usersData = response.reverse()
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

    this.request.getFireWallRequest().subscribe(response => {
      this.fireWallData = response
      console.log(response);
      
    })
    var token: any = localStorage.getItem('access_token')
    var decoded: any = jwt_decode(token);

    if (decoded.user_role == 'admin') {
      this.permitActions = true
    } else if (decoded.user_role == 'sales') {
      this.permitActions = false
    }

    this.request.getReport1Request().subscribe(response => {
      this.report1Data = response
    })

    this.request.getReport2Request().subscribe(response => {
      this.report2Data = response
    })

    this.request.getReport3Request().subscribe(response => {
      this.report3Data = response
    })

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
      this.request.getFilterAccountsRequest(accountsFilterFormData.id, accountsFilterFormData.fio, accountsFilterFormData.tarif_id, accountsFilterFormData.speed_cf, accountsFilterFormData.phone_number, accountsFilterFormData.ipaddress, accountsFilterFormData.acc_info, accountsFilterFormData.conf_firewall_id, accountsFilterFormData.passport, accountsFilterFormData.age, accountsFilterFormData.gender, accountsFilterFormData.overdraft, accountsFilterFormData.customr_type, accountsFilterFormData.comment, accountsFilterFormData.status, start_create.toLocaleDateString().split('.').reverse().join('.'), end_create.toLocaleDateString().split('.').reverse().join('.'), start_date.toLocaleDateString().split('.').reverse().join('.'), end_date.toLocaleDateString().split('.').reverse().join('.'), accountsFilterFormData.connect_by, accountsFilterFormData.contact_by, accountsFilterFormData.page_size).subscribe( (response: any) => {
        this.accountsData = response
        response.forEach( (element: any) => {
          this.fireWall4Table = this.fireWallData.filter( (res: any) => res.id ==  element.conf_firewall_id)[0]
        });
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
        this.request.getFilterAccountsRequest(accountsFilterFormData.id, accountsFilterFormData.fio, accountsFilterFormData.tarif_id, accountsFilterFormData.speed_cf, accountsFilterFormData.phone_number, accountsFilterFormData.ipaddress, accountsFilterFormData.acc_info, accountsFilterFormData.conf_firewall_id, accountsFilterFormData.passport, accountsFilterFormData.age, accountsFilterFormData.gender, accountsFilterFormData.overdraft, accountsFilterFormData.customr_type, accountsFilterFormData.comment, accountsFilterFormData.status, start_create.toLocaleDateString().split('.').reverse().join('.'), end_create.toLocaleDateString().split('.').reverse().join('.'), '', '', accountsFilterFormData.connect_by, accountsFilterFormData.contact_by, accountsFilterFormData.page_size).subscribe( (response: any) => {
          this.accountsData = response
          response.forEach( (element: any) => {
            this.fireWall4Table = this.fireWallData.filter( (res: any) => res.id ==  element.conf_firewall_id)[0]
          });
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
        this.request.getFilterAccountsRequest(accountsFilterFormData.id, accountsFilterFormData.fio, accountsFilterFormData.tarif_id, accountsFilterFormData.speed_cf, accountsFilterFormData.phone_number, accountsFilterFormData.ipaddress, accountsFilterFormData.acc_info, accountsFilterFormData.conf_firewall_id, accountsFilterFormData.passport, accountsFilterFormData.age, accountsFilterFormData.gender, accountsFilterFormData.overdraft, accountsFilterFormData.customr_type, accountsFilterFormData.comment, accountsFilterFormData.status, '', '', start_date.toLocaleDateString().split('.').reverse().join('.'), end_date.toLocaleDateString().split('.').reverse().join('.'), accountsFilterFormData.connect_by, accountsFilterFormData.contact_by, accountsFilterFormData.page_size).subscribe( (response: any) => {
          this.accountsData = response
          response.forEach( (element: any) => {
            this.fireWall4Table = this.fireWallData.filter( (res: any) => res.id ==  element.conf_firewall_id)[0]
          });
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
        this.request.getFilterAccountsRequest(accountsFilterFormData.id, accountsFilterFormData.fio, accountsFilterFormData.tarif_id, accountsFilterFormData.speed_cf, accountsFilterFormData.phone_number, accountsFilterFormData.ipaddress, accountsFilterFormData.acc_info, accountsFilterFormData.conf_firewall_id, accountsFilterFormData.passport, accountsFilterFormData.age, accountsFilterFormData.gender, accountsFilterFormData.overdraft, accountsFilterFormData.customr_type, accountsFilterFormData.comment, accountsFilterFormData.status, '', '', '', '', accountsFilterFormData.connect_by, accountsFilterFormData.contact_by, accountsFilterFormData.page_size).subscribe( (response: any) => {
          let n=0;
          response.forEach( (element: any) => {
            this.accountsData[n] = element;
            this.accountsData[n].fireWall4Table = this.fireWallData.filter( (res: any) => res.id ==  element.conf_firewall_id)[0];
            console.log(this.accountsData);
            n++;
          });
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
      this.request.postAccountsRequest(accountsAddFormData.fio, accountsAddFormData.tarif_id, accountsAddFormData.price_cf, accountsAddFormData.speed_cf, accountsAddFormData.phone_number, end_date.toISOString(), ip_adress, accountsAddFormData.acc_info, accountsAddFormData.conf_firewall_id * 1, accountsAddFormData.passport, age.toISOString(), accountsAddFormData.gender, parseInt(accountsAddFormData.overdraft), accountsAddFormData.customr_type, accountsAddFormData.comment, accountsAddFormData.connect_by, accountsAddFormData.contact_by).subscribe(response => {
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
    let activeItem = this.accountsData.filter( (res: any) => res.id ==  id)[0]
    let ip_adress = activeItem.ipaddress.split('.')
    this.accountsEditForm.controls['ipaddress1'].patchValue(ip_adress[0])
    this.accountsEditForm.controls['ipaddress2'].patchValue(ip_adress[1])
    this.accountsEditForm.controls['ipaddress3'].patchValue(ip_adress[2])
    this.accountsEditForm.controls['ipaddress4'].patchValue(ip_adress[3])
    this.accountsEditForm.controls['connect_by'].patchValue(activeItem.connect_user_id)
    this.accountsEditForm.controls['contact_by'].patchValue(activeItem.contact_user_id)
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
      this.request.putAccountsRequest(this.tableId, accountsEditFormData.fio, accountsEditFormData.tarif_id, accountsEditFormData.price_cf, accountsEditFormData.speed_cf, accountsEditFormData.phone_number, end_date.toISOString(), ip_adress, accountsEditFormData.acc_info, accountsEditFormData.conf_firewall_id * 1, accountsEditFormData.passport, age.toISOString(), accountsEditFormData.gender, parseInt(accountsEditFormData.overdraft), accountsEditFormData.customr_type, accountsEditFormData.comment, accountsEditFormData.connect_by, accountsEditFormData.contact_by).subscribe(response => {
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

  openAddiitionalIpModal(id: any) {
    this.serviceId = id
    this.additionalIpModal = true
    this.isLoading = true
    this.request.getAdditionalIpRequest().subscribe( (response: any) => {
      this.additionalIpData = response
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

  addNewAdditionalIp() {
    const addAdditionalIpFormData = {...this.addAdditionalIpForm.value}
    this.isLoading = true
    this.request.postAdditionalIpRequest(this.serviceId, addAdditionalIpFormData.ip).subscribe(response => {
      this.isLoading = false
      this.request.getAdditionalIpRequest().subscribe( (response: any) => {
        this.additionalIpData = response
      })
    }, error => {
      this.isLoading = false
      alert(error.error.Error)
    })
  }

  deleteAdditionalIp(id: any) {
    this.isLoading = true
    let deleteConf = confirm("Вы уверени что хотите удалить данный Лицевой Счёт: " + id)
    if(deleteConf == true) {
      this.request.deleteAdditionalIpRequest(id).subscribe(response => {
        this.isLoading = false
        this.request.getAdditionalIpRequest().subscribe(response => {
          this.additionalIpData = response
        })
      }, error => {
        this.isLoading = false
        alert(error.error.Error)
      })
    } else {
      this.isLoading = false
    }
  }

  openAdditionalInfoModal(id: any) {
    this.serviceId = id
    this.additionalInfoModal = true
    this.isLoading = true
    this.request.getAdditionalInfoRequest().subscribe( (response: any) => {
      this.additionalInfoData = response
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

    this.request.getUsersRequest().subscribe( (response: any) => {
      console.log(response);
    })
  }

  addNewAdditionalInfo() {
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

  changeAdditionalInfo(id: number) {
    this.editCredit = true
    let creditDataById = this.creditData.filter( (res: any) => res.id == id )[0]
    this.addCreditForm.patchValue(creditDataById)
    let expire_at = new Date(creditDataById.expire_at)
    let expire_atFormat = expire_at.toLocaleDateString().split('.')
    this.addCreditForm.controls['expire_at'].patchValue(`${expire_atFormat[2]}-${expire_atFormat[1]}-${expire_atFormat[0]}`)
    this.serviceId = creditDataById.id
  }

  EditAdditionalInfo() {
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

  openExtandsModal(id: any) {
    this.serviceId = id
    this.extandsModal = true
  }
  
  addNewExtands() {
    const addExtandsFormData = {...this.addExtandsForm.value}
    this.isLoading = true
    let end_date = new Date(addExtandsFormData.end_date)
    this.request.putExtensionRequest(this.serviceId, end_date.toISOString()).subscribe(response => {
      this.isLoading = false
      location.reload()
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

  exportexcelAccount(): void {
      this.fileName = 'Аккаунт.xlsx'
       /* table id is passed over here */   
       let element = document.getElementById('excel-table-account'); 
       const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);

       var wscols = [
        {wch:8},
        {wch:40},
        {wch:20},
        {wch:20},
        {wch:20},
        {wch:20},
        {wch:30},
        {wch:30},
        {wch:30},
        {wch:30},
        {wch:40},
        {wch:30},
        {wch:30},
        {wch:10},
        {wch:20},
        {wch:10},
        {wch:15},
        {wch:40},
        {wch:40},
        {wch:20},
        {wch:15},
    ];
    
    ws['!cols'] = wscols;

       /* generate workbook and add the worksheet */
       const wb: XLSX.WorkBook = XLSX.utils.book_new();
       XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

       /* save to file */
       XLSX.writeFile(wb, this.fileName);
			
    }

    exportexcelReport1(): void {
      this.fileName = 'Отчёт 1.xlsx'
       /* table id is passed over here */   
       let element = document.getElementById('excel-table-report1'); 
       const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);

       var wscols = [
        {wch:8},
        {wch:40},
        {wch:20},
        {wch:30},
        {wch:50},
        {wch:20},
        {wch:30},
        {wch:30},
        {wch:30},
        {wch:30},
        {wch:40},
        {wch:30},
        {wch:30},
        {wch:10},
        {wch:20},
        {wch:10},
        {wch:15},
        {wch:40},
        {wch:40},
        {wch:20},
        {wch:15},
    ];
    
    ws['!cols'] = wscols;

       /* generate workbook and add the worksheet */
       const wb: XLSX.WorkBook = XLSX.utils.book_new();
       XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

       /* save to file */
       XLSX.writeFile(wb, this.fileName);
			
    }

    exportexcelReport2(): void {
      this.fileName = 'Отчёт 2.xlsx'
       /* table id is passed over here */   
       let element = document.getElementById('excel-table-report2'); 
       const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);

       var wscols = [
        {wch:8},
        {wch:40},
        {wch:20},
        {wch:40},
        {wch:40},
        {wch:20},
        {wch:30},
        {wch:30},
        {wch:30},
        {wch:30},
        {wch:40},
        {wch:30},
        {wch:30},
        {wch:10},
        {wch:20},
        {wch:10},
        {wch:15},
        {wch:40},
        {wch:40},
        {wch:20},
        {wch:15},
    ];
    
    ws['!cols'] = wscols;

       /* generate workbook and add the worksheet */
       const wb: XLSX.WorkBook = XLSX.utils.book_new();
       XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

       /* save to file */
       XLSX.writeFile(wb, this.fileName);
			
    }

    exportexcelReport3(): void {
      this.fileName = 'Отчёт 3.xlsx'
       /* table id is passed over here */   
       let element = document.getElementById('excel-table-report3'); 
       const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);

       var wscols = [
        {wch:8},
        {wch:40},
        {wch:20},
        {wch:20},
        {wch:50},
        {wch:20},
        {wch:30},
        {wch:30},
        {wch:30},
        {wch:30},
        {wch:40},
        {wch:30},
        {wch:30},
        {wch:10},
        {wch:20},
        {wch:10},
        {wch:15},
        {wch:40},
        {wch:40},
        {wch:20},
        {wch:15},
    ];
    
    ws['!cols'] = wscols;

       /* generate workbook and add the worksheet */
       const wb: XLSX.WorkBook = XLSX.utils.book_new();
       XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

       /* save to file */
       XLSX.writeFile(wb, this.fileName);
			
    }

}
