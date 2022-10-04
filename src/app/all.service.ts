import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RequestsService {
  private url = 'https://api.nets.tj'
  // http://45.94.219.6:12345
  // https://api.nets.tj

  constructor(private http: HttpClient) {}

  // Auth
  authRequest(login: any, password: any) {
    let header: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json'
    })
    return this.http.post(this.url + '/login', {"login": login, "password": password}, {headers: header})
  }

  refreshRequest(refresh_token: any) {
    let header: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
    })
    return this.http.post(this.url + '/refresh',  {"refresh_token": refresh_token}, {headers: header})
  }
  // End of Auth

  // Tarifs
  getTarifsRequest() {
    let header: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `${localStorage.getItem('access_token')}`
    })
    return this.http.get(this.url + '/api/tariff', {headers: header})
  }

  getFilterTarifsRequest(name: string, price: string, score: string, speed: string, comment: string) {
    let header: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `${localStorage.getItem('access_token')}`
    })
    return this.http.get(this.url + `/api/tariff?name=*${name}*&price=${price}&score=${score}&speed=${speed}&comment=${comment}`, {headers: header})
  }

  postTarifsRequest(name: string, price: number, score: number, speed: number, comment: string) {
    let header: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `${localStorage.getItem('access_token')}`
    })
    return this.http.post(this.url + '/api/tariff', {"name": name, "price": price, "score": score, "speed": speed, "comment": comment}, {headers: header})
  }
  
  putTarifsRequest(id: number, name: string, price: number, score: number, speed: number, comment: string) {
    let header: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `${localStorage.getItem('access_token')}`
    })
    return this.http.put(this.url + '/api/tariff', {"id": id, "name": name, "price": price, "score": score, "speed": speed, "comment": comment}, {headers: header})
  }

  deleteTarifsRequest(id: number) {
    let header: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `${localStorage.getItem('access_token')}`
    })
    return this.http.delete(this.url + '/api/tariff?id=' + id, {headers: header})
  }
  // End of Tarifs

  // Accounts
  getAccountsRequest() {
    let header: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `${localStorage.getItem('access_token')}`
    })
    return this.http.get(this.url + '/api/account', {headers: header})
  }

  getAccountsByIdRequest(id: number) {
    let header: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `${localStorage.getItem('access_token')}`
    })
    return this.http.get(this.url + '/api/account?accounts.id=' + id, {headers: header})
  }

  getFilterAccountsRequest(id: any, fio: any, tarif_id: any, speed_cf: any, phone_number: any, ipaddress: any, acc_info: any, conf_firewall_id: any, passport: any, age: any, gender: any, device_type_id: any, overdraft: any, customr_type: any, comment: any, status: any, start_created: any, end_created: any, start_date: any, end_date: any, connect_by: any, contact_by: any, page_size: any) {
    let header: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `${localStorage.getItem('access_token')}`
    })
    return this.http.get(this.url + `/api/account?accounts.id=${id}&accounts.fio=*${fio}*&tarif_id=${tarif_id}&speed_cf=${speed_cf}&phone_number=*${phone_number}*&ipaddress=${ipaddress}&acc_info=${acc_info}&conf_firewall_id=${conf_firewall_id}&passport=*${passport}*&age=${age}&gender=${gender}&device_type_id=${device_type_id}&overdraft=${overdraft}&accounts.customr_type=${customr_type}&comment=${comment}&status=${status}&accounts.created_at>=${start_created}&accounts.created_at<=${end_created}&end_date>=${start_date}&end_date<=${end_date}&connect_user_id=${connect_by}&contact_user_id=${contact_by}&page_size=${page_size}`, {headers: header})
  }

  postAccountsRequest(fio: string, tarif_id: number, price_cf: any, speed_cf: any, phone_number: string, end_date: any, ipaddress: string, acc_info: string, conf_firewall_id: number, passport: any, age: any, gender: any, device_type_id: any, overdraft: any, customr_type: any, comment: string, connect_by: any, contact_by: any, table_id: any, connect_type_id: any, promo_id: any) {
    let header: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `${localStorage.getItem('access_token')}`
    })
    return this.http.post(this.url + '/api/account', {"fio":fio, "tarif_id": tarif_id * 1, "price_cf": price_cf, "speed_cf": speed_cf, "phone_number": phone_number, "end_date": end_date, "ipaddress": ipaddress, "acc_info": acc_info, "conf_firewall_id": conf_firewall_id, "passport": passport, "age": age, "gender": gender, "device_type_id": device_type_id, "overdraft": overdraft, "customr_type": customr_type, "comment":comment, "connect_user_id": connect_by*1, "contact_user_id": contact_by*1, "table_id": table_id, "connect_type_id": connect_type_id, "promo_id": promo_id}, {headers: header})
  }
  
  putAccountsRequest(id: number, fio: string, tarif_id: number, price_cf: any, speed_cf: any, phone_number: string, end_date: any, ipaddress: string, acc_info: string, conf_firewall_id: number, passport: any, age: any, gender: any, device_type_id: any, overdraft: any, customr_type: any, comment: string, connect_by: any, contact_by: any, table_id: any, connect_type_id: any, promo_id: any) {
    let header: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `${localStorage.getItem('access_token')}`
    })
    return this.http.put(this.url + '/api/account', {"id": id, "fio":fio, "tarif_id": tarif_id * 1, "price_cf": price_cf, "speed_cf": speed_cf, "phone_number": phone_number, "end_date": end_date, "ipaddress": ipaddress, "acc_info": acc_info, "conf_firewall_id": conf_firewall_id, "passport": passport, "age": age, "gender": gender, "device_type_id": device_type_id, "overdraft": overdraft, "customr_type": customr_type, "comment":comment,"connect_user_id":connect_by*1,"contact_user_id":contact_by*1, "table_id": table_id, "connect_type_id": connect_type_id, "promo_id": promo_id}, {headers: header})
  }

  deleteAccountsRequest(id: number) {
    let header: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `${localStorage.getItem('access_token')}`
    })
    return this.http.delete(this.url + '/api/account?id=' + id, {headers: header})
  }

  getAccountRefresh(id: number) {
     let header: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `${localStorage.getItem('access_token')}`
    })
    return this.http.get(this.url + '/api/account/refresh?id=' + id, {headers: header})
  }

  getAccountBlockOff(id: number) {
     let header: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `${localStorage.getItem('access_token')}`
    })
    return this.http.get(this.url + '/api/account/off?id=' + id, {headers: header})
  }

  getAccountBlockOn(id: number) {
     let header: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `${localStorage.getItem('access_token')}`
    })
    return this.http.get(this.url + '/api/account/on?id=' + id, {headers: header})
  }

  // Additional Ip
  getAdditionalIpRequest() {
    let header: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `${localStorage.getItem('access_token')}`
    })
    return this.http.get(this.url + '/api/additional_ip', {headers: header})
  }

  postAdditionalIpRequest(account_id: any, ip: any) {
    let header: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `${localStorage.getItem('access_token')}`
    })
    return this.http.post(this.url + '/api/additional_ip', {"account_id": account_id, "ip":ip}, {headers: header})
  }

  deleteAdditionalIpRequest(id: number) {
    let header: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `${localStorage.getItem('access_token')}`
    })
    return this.http.delete(this.url + '/api/additional_ip?id=' + id, {headers: header})
  }
  // End of Additional Ip

  // Additional Info
  getAdditionalInfoRequest() {
    let header: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `${localStorage.getItem('access_token')}`
    })
    return this.http.get(this.url + '/api/account_additional_info', {headers: header})
  }

  postAdditionalInfoRequest(account_id: number, city_id: any, district_id: any, street_id: any, street_number: any, street_apartment: any, connect_type_id: any, сonnect_user_id: any, contact_user_id: any) {
    let header: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `${localStorage.getItem('access_token')}`
    })
    return this.http.post(this.url + '/api/account_additional_info', {"account_id": account_id, "city_id": city_id,  "district_id": district_id,  "street_id": street_id,  "street_number": street_number, "street_apartment": street_apartment, "connect_type_id": connect_type_id,  "сonnect_user_id": сonnect_user_id, "contact_user_id": contact_user_id 
      }, {headers: header})
  }

  putAdditionalInfoRequest(id: number, account_id: number, city_id: any, district_id: any, street_id: any, street_number: any, street_apartment: any, connect_type_id: any, сonnect_user_id: any, contact_user_id: any) {
    let header: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `${localStorage.getItem('access_token')}`
    })
    return this.http.put(this.url + '/api/account_additional_info', {"id": id, "account_id": account_id, "city_id": city_id,  "district_id": district_id,  "street_id": street_id,  "street_number": street_number, "street_apartment": street_apartment, "connect_type_id": connect_type_id,  "сonnect_user_id": сonnect_user_id, "contact_user_id": contact_user_id}, {headers: header})
  }
  // End of Additional Info

  // Extension
  putExtensionRequest(account_id: number, end_date: any) {
    let header: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `${localStorage.getItem('access_token')}`
    })
    return this.http.put(this.url + '/api/account/end_date_update', {"account_id": account_id, "end_date": end_date}, {headers: header})
  }
  // End of Extension

  // Reports

  getReport1Request() {
    let header: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `${localStorage.getItem('access_token')}`
    })
    return this.http.get(this.url + '/api/report/7', {headers: header})
  }

  getFilterReport1Request(date_from: any, date_to: any) {
    let header: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `${localStorage.getItem('access_token')}`
    })
    return this.http.get(this.url + `/api/report/7?date_from=${date_from}&date_to=${date_to}`, {headers: header})
  }

  getReport2Request() {
    let header: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `${localStorage.getItem('access_token')}`
    })
    return this.http.get(this.url + '/api/report/10', {headers: header})
  }

  getFilterReport2Request(date_from: any, date_to: any) {
    let header: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `${localStorage.getItem('access_token')}`
    })
    return this.http.get(this.url + `/api/report/10?date_from=${date_from}&date_to=${date_to}`, {headers: header})
  }

  getReport3Request() {
    let header: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `${localStorage.getItem('access_token')}`
    })
    return this.http.get(this.url + '/api/report/11', {headers: header})
  }

  getFilterReport3Request(date_from: any, date_to: any) {
    let header: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `${localStorage.getItem('access_token')}`
    })
    return this.http.get(this.url + `/api/report/11?date_from=${date_from}&date_to=${date_to}`, {headers: header})
  }
  // End of Reports

  // Content_Types
  getContentTypeRequest() {
    let header: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `${localStorage.getItem('access_token')}`
    })
    return this.http.get(this.url + '/api/conn_type', {headers: header})
  }
  // End of Connect Types

  // End of Accounts

  // Transactions
  getTransactionsRequest() {
    let header: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `${localStorage.getItem('access_token')}`
    })
    return this.http.get(this.url + '/api/transaction', {headers: header})
  }

  getFilterTransactionsRequest(id: string, operator: string, txn_date: string, txn_id: string, comment: string,  start_date: any, end_date: any) {
    let header: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `${localStorage.getItem('access_token')}`
    })
    return this.http.get(this.url + `/api/transaction?acc_id=${id}&operator=*${operator}*&txn_date=${txn_date}&txn_id=${txn_id}&comment=${comment}&date>=${start_date}&date<=${end_date}`, {headers: header})
  }

  postTransactionsRequest(account_id: any, operator: string, sum: number, score: number, date: Date, txn_date: any, txn_id: any, comment: string) {
    let header: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `${localStorage.getItem('access_token')}`
    })
    return this.http.post(this.url + '/api/transaction', {"account_id": account_id, "operator": operator, "sum": sum, "score": score, "date": date, "txn_date": txn_date, "txn_id": txn_id, "comment": comment}, {headers: header})
  }

  postTransactions2Request(account_id: any, sum: number, comment: string) {
    let header: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `${localStorage.getItem('access_token')}`
    })
    return this.http.post(this.url + '/api/transaction', {"account_id": account_id, "sum": sum, "comment": comment}, {headers: header})
  }
  // End of Transactions

  // Change History
  getChangeHistoryRequest(id: number) {
    let header: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `${localStorage.getItem('access_token')}`
    })
    return this.http.get(this.url + '/api/account/history?account_id=' + id, {headers: header})
  }
  // End of Change History

  // Services
  getServicesRequest() {
    let header: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `${localStorage.getItem('access_token')}`
    })
    return this.http.get(this.url + '/api/service', {headers: header})
  }

  getFilterServicesRequest(name: string, price: string, score: string, month_count: string, comment: string) {
    let header: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `${localStorage.getItem('access_token')}`
    })
    return this.http.get(this.url + `/api/service?name=*${name}*&price=${price}&score=${score}&month_count=${month_count}&comment=${comment}`, {headers: header})
  }

  postServicesRequest(name: string, price: number, score: number, month_count: number, comment: string) {
    let header: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `${localStorage.getItem('access_token')}`
    })
    return this.http.post(this.url + '/api/service', {"name": name, "price": price, "score": score, "month_count": month_count, "comment": comment}, {headers: header})
  }
  
  putServicesRequest(id: number, name: string, price: number, score: number, month_count: number, comment: string) {
    let header: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `${localStorage.getItem('access_token')}`
    })
    return this.http.put(this.url + '/api/service', {"id": id, "name": name, "price": price, "score": score, "month_count": month_count, "comment": comment}, {headers: header})
  }

  deleteServicesRequest(id: number) {
    let header: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `${localStorage.getItem('access_token')}`
    })
    return this.http.delete(this.url + '/api/service?id=' + id, {headers: header})
  }
  // End of Services

  // Users
  getUsersRequest() {
    let header: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `${localStorage.getItem('access_token')}`
    })
    return this.http.get(this.url + '/api/user', {headers: header})
  }

  getFilterUsersRequest(fio: string, login: string, role: string) {
    let header: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `${localStorage.getItem('access_token')}`
    })
    return this.http.get(this.url + `/api/user?fio=*${fio}*&login=${login}&role=${role}`, {headers: header})
  }

  postUsersRequest(fio: string, login: string, password: string, role: string) {
    let header: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `${localStorage.getItem('access_token')}`
    })
    return this.http.post(this.url + '/api/user', {"fio": fio, "login": login, "password": password, "role": role}, {headers: header})
  }
  
  putUsersRequest(id: number, fio: string, login: string, password: string, role: string) {
    let header: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `${localStorage.getItem('access_token')}`
    })
    return this.http.put(this.url + '/api/user', {"id": id, "fio": fio, "login": login, "password": password, "role": role}, {headers: header})
  }

  deleteUsersRequest(id: number) {
    let header: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `${localStorage.getItem('access_token')}`
    })
    return this.http.delete(this.url + '/api/user?id=' + id, {headers: header})
  }

  // Permission
  getFilterPermissionRequest(id: any, name: any, rout_id: any) {
    let header: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `${localStorage.getItem('access_token')}`
    })
    return this.http.get(this.url + `/api/permission?id=${id}&name=${name}&rout_id=${rout_id}`, {headers: header})
  }

  getPermissionRequest() {
    let header: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `${localStorage.getItem('access_token')}`
    })
    return this.http.get(this.url + '/api/permission', {headers: header})
  }
  
  postPermissionRequest(name: string, user_id: number, group_id: number, rout_id: any) {
    let header: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `${localStorage.getItem('access_token')}`
    })
    return this.http.post(this.url + '/api/permission', {"name": name, "user_id": user_id, "group_id": group_id, "rout_id": rout_id}, {headers: header})
  }
  
  putPermissionRequest(id: number, name: string, user_id: number, group_id: number, rout_id: any) {
    let header: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `${localStorage.getItem('access_token')}`
    })
    return this.http.put(this.url + '/api/permission', {"id": id, "name": name, "user_id": user_id, "group_id": group_id, "rout_id": rout_id}, {headers: header})
  }

  deletePermissionRequest(id: number) {
    let header: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `${localStorage.getItem('access_token')}`
    })
    return this.http.delete(this.url + '/api/permission?id=' + id, {headers: header})
  }

  // Permission Routes
  getPermissionRouteRequest() {
    let header: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `${localStorage.getItem('access_token')}`
    })
    return this.http.get(this.url + '/api/permission/routes', {headers: header})
  }
  // End Permission Route

  // End of Permission

  // End of Users

  // Service Link

  getFilterServiceLinkRequest(account_id: any, fio: any, created_at: any, expire_at: any, next_payment: any, service_id: string, price: any, deleted: any) {
    let header: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `${localStorage.getItem('access_token')}`
    })
    return this.http.get(this.url + `/api/service_link?account_id=${account_id}&fio=${fio}&service_account_links.created_at>=${created_at}&service_account_links.expire_at<=${expire_at}&next_payment=${next_payment}&service_id=${service_id}&price=${price}&service_account_links.deleted=${deleted}`, {headers: header})
  }

  getServiceLinkRequest() {
    let header: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `${localStorage.getItem('access_token')}`
    })
    return this.http.get(this.url + '/api/service_link', {headers: header})
  }

  getServiceLinkRequestByID(id: any) {
    let header: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `${localStorage.getItem('access_token')}`
    })
    return this.http.get(this.url + '/api/service_link?account_id=' + id, {headers: header})
  }

  posServiceLinkRequest(account_id: any, created_at: any, service_id: any) {
    let header: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `${localStorage.getItem('access_token')}`
    })
    return this.http.post(this.url + '/api/service_link', {"account_id": account_id, "created_at": created_at, "service_id": service_id * 1}, {headers: header})
  }
  
  putServiceLinkRequest(id: number, fio: string, login: string, password: string, role: string) {
    let header: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `${localStorage.getItem('access_token')}`
    })
    return this.http.put(this.url + '/api/service_link', {"id": id, "fio": fio, "login": login, "password": password, "role": role}, {headers: header})
  }

  deleteServiceLinkRequest(id: number) {
    let header: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `${localStorage.getItem('access_token')}`
    })
    return this.http.delete(this.url + '/api/service_link?id=' + id, {headers: header})
  }
  // End of Service Link

  // Credit
  getCreditRequest() {
    let header: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `${localStorage.getItem('access_token')}`
    })
    return this.http.get(this.url + '/api/credit', {headers: header})
  }

  postCreditRequest(account_id: any, comment: any, expire_at: any) {
    let header: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `${localStorage.getItem('access_token')}`
    })
    return this.http.post(this.url + '/api/credit', {"account_id": account_id, "comment": comment, "expire_at": expire_at * 1}, {headers: header})
  }
  
  putCreditRequest(id: number, account_id: any, comment: any, expire_at: any) {
    let header: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `${localStorage.getItem('access_token')}`
    })
    return this.http.put(this.url + '/api/credit', {"id": id, "account_id": account_id, "comment": comment, "expire_at": expire_at}, {headers: header})
  }
  // End of Credit

  // Devices
  getDeviceRequest() {
    let header: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `${localStorage.getItem('access_token')}`
    })
    return this.http.get(this.url + '/api/device_type', {headers: header})
  }

  getFilterDeviceRequest(id: number, name: string) {
    let header: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `${localStorage.getItem('access_token')}`
    })
    return this.http.get(this.url + `/api/device_type?id=${id}&name=${name}`, {headers: header})
  }

  postDeviceRequest(name: string) {
    let header: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `${localStorage.getItem('access_token')}`
    })
    return this.http.post(this.url + '/api/device_type', {"name": name}, {headers: header})
  }
  
  putDeviceRequest(id: number, name: string) {
    let header: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `${localStorage.getItem('access_token')}`
    })
    return this.http.put(this.url + '/api/device_type', {"id": id, "name": name}, {headers: header})
  }

  deleteDeviceRequest(id: number) {
    let header: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `${localStorage.getItem('access_token')}`
    })
    return this.http.delete(this.url + '/api/device_type?id=' + id, {headers: header})
  }
  // End of Devices


  // Devices
  getRoleRequest() {
    let header: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `${localStorage.getItem('access_token')}`
    })
    return this.http.get(this.url + '/api/group', {headers: header})
  }

  getFilterRoleRequest(id: number, name: string) {
    let header: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `${localStorage.getItem('access_token')}`
    })
    return this.http.get(this.url + `/api/group?id=${id}&name=${name}`, {headers: header})
  }

  postRoleRequest(name: string) {
    let header: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `${localStorage.getItem('access_token')}`
    })
    return this.http.post(this.url + '/api/group', {"name": name}, {headers: header})
  }
  
  putRoleRequest(id: number, name: string) {
    let header: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `${localStorage.getItem('access_token')}`
    })
    return this.http.put(this.url + '/api/group', {"id": id, "name": name}, {headers: header})
  }
  // End of Devices

  // Promotion
  getPromotionRequest() {
    let header: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `${localStorage.getItem('access_token')}`
    })
    return this.http.get(this.url + '/api/promotion', {headers: header})
  }

  getFilterPromotionRequest(id: number, name: string, day_count: any, deleted: any) {
    let header: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `${localStorage.getItem('access_token')}`
    })
    return this.http.get(this.url + `/api/promotion?id=${id}&name=${name}&day_count=${day_count}&deleted=${deleted}`, {headers: header})
  }

  postPromotionRequest(name: string, day_count: any) {
    let header: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `${localStorage.getItem('access_token')}`
    })
    return this.http.post(this.url + '/api/promotion', {"name": name, "day_count": day_count}, {headers: header})
  }
  
  putPromotionRequest(id: number, name: string, day_count: any) {
    let header: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `${localStorage.getItem('access_token')}`
    })
    return this.http.put(this.url + '/api/promotion', {"id": id, "name": name, "day_count": day_count}, {headers: header})
  }

  deletePromotionRequest(id: number) {
    let header: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `${localStorage.getItem('access_token')}`
    })
    return this.http.delete(this.url + '/api/promotion?id=' + id, {headers: header})
  }
  // End of Promotion


  // IP Group
  getIPGroupRequest() {
    let header: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `${localStorage.getItem('access_token')}`
    })
    return this.http.get(this.url + '/api/ip_group', {headers: header})
  }

  getFilterIPGroupRequest(id: number, ip_start: any, ip_mask: any, last_ip: any) {
    let header: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `${localStorage.getItem('access_token')}`
    })
    return this.http.get(this.url + `/api/ip_group?id=${id}&ip_start=${ip_start}&ip_mask=${ip_mask}&last_ip=${last_ip}`, {headers: header})
  }

  postIPGroupRequest(ip_start: any, ip_mask: any, last_ip: any) {
    let header: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `${localStorage.getItem('access_token')}`
    })
    return this.http.post(this.url + '/api/ip_group', {"ip_start": ip_start, "ip_mask": ip_mask, "last_ip": last_ip}, {headers: header})
  }
  
  putIPGroupRequest(id: number, ip_start: any, ip_mask: any, last_ip: any) {
    let header: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `${localStorage.getItem('access_token')}`
    })
    return this.http.put(this.url + '/api/ip_group', {"id": id, "ip_start": ip_start, "ip_mask": ip_mask, "last_ip": last_ip}, {headers: header})
  }

  deleteIPGroupRequest(id: number) {
    let header: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `${localStorage.getItem('access_token')}`
    })
    return this.http.delete(this.url + '/api/ip_group?id=' + id, {headers: header})
  }

  // Next IP
  getNextIPRequest(id: number) {
    let header: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `${localStorage.getItem('access_token')}`
    })
    return this.http.get(this.url + '/api/ip_group/next_ip?id=' + id, {headers: header})
  }
  // End of Next IP

  // End of IP Group


  // FireWall
  getFireWallRequest() {
    let header: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `${localStorage.getItem('access_token')}`
    })
    return this.http.get(this.url + '/api/conf_firewall', {headers: header})
  }

  getFilterFireWallRequest(id: number, firewall_host: any, firewall_port: any, firewall_user: any, firewall_password: any, firewall_dysh_path: any) {
    let header: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `${localStorage.getItem('access_token')}`
    })
    return this.http.get(this.url + `/api/conf_firewall?ID=${id}&firewall_host=${firewall_host}&firewall_port=${firewall_port}&firewall_user=${firewall_user}&firewall_password=${firewall_password}&firewall_dysh_path=${firewall_dysh_path}`, {headers: header})
  }

  postFireWallRequest(firewall_host: any, firewall_port: any, firewall_user: any, firewall_password: any, firewall_dysh_path: any) {
    let header: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `${localStorage.getItem('access_token')}`
    })
    return this.http.post(this.url + '/api/conf_firewall', {"firewall_host": firewall_host, "firewall_port": firewall_port, "firewall_user": firewall_user, "firewall_password": firewall_password, "firewall_dysh_path": firewall_dysh_path}, {headers: header})
  }
  
  putFireWallRequest(ID: any, firewall_host: any, firewall_port: any, firewall_user: any, firewall_password: any, firewall_dysh_path: any) {
    let header: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `${localStorage.getItem('access_token')}`
    })
    return this.http.put(this.url + '/api/conf_firewall', {"ID": ID, "firewall_host": firewall_host, "firewall_port": firewall_port, "firewall_user": firewall_user, "firewall_password": firewall_password, "firewall_dysh_path": firewall_dysh_path}, {headers: header})
  }

  // deleteFireWallRequest(id: number) {
  //   let header: HttpHeaders = new HttpHeaders({
  //     'Content-Type': 'application/json',
  //     'Authorization': `${localStorage.getItem('access_token')}`
  //   })
  //   return this.http.delete(this.url + '/api/conf_firewall?id=' + id, {headers: header})
  // }
  // End of FireWall
}
