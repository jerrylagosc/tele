export interface registroInterface {
  type_document: string,
  identification: number,
  details: {
    name_company: '',
    first_name: '',
    second_name: '',
    first_surname: '',
    second_surname: '',
  }
  email: string,
  town: string,
  mobile: number,
  autorization: boolean,
  second_autorization: boolean,

}
