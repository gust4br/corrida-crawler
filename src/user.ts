export enum Genre {
  MASCULINO = 'masculino',
  FEMININO = 'feminino',
  NONE = 'not_inform'
}

export enum Category {
  GENERAL_5KM = 'general_5',
  PCD_5KM = 'pcd_5',
  GENERAL_8KM = 'general_8',
  PCD_8KM = 'pcd_8',
  INDUSTRIALIST_8KM = 'industrialist_8',
  GENERAL_15KM = 'general_15',
  PCD_15KM = 'pcd_15',
  INDUSTRIALIST_15KM = 'industrialist_15'
}

export enum Vehicle {
  PLANE = 'plane',
  BUS = 'bus',
  OWN_VEHICLE = 'own_vehicle',
  RENTED_VEHICLE = 'rented_vehicle',
  BIKE = 'bike',
  APP = 'app',
  OTHER = 'other',
}

export enum TShirt {
  P = 'p',
  M = 'm',
  G = 'g',
  GG = 'gg',
  EG = 'eg',
}

export class User {
  private fullName: string;
  private email: string;
  private birthDate: string;
  private cpf: string;
  private genre: Genre;
  private mothersName: string;

  private address: string | undefined;
  private state: string | undefined;
  private city: string | undefined;

  private category: Category;

  private tShirt: TShirt;

  private emergencyFullName: string | undefined;
  private emergencyEmail: string | undefined;
  private emergencyPhone: string | undefined;

  private instagram: string | undefined;
  private facebook: string | undefined;
  private tiktok: string | undefined;
  private linkedin: string | undefined;
  private x: string | undefined;

  private vehicle: Vehicle | undefined;
  private permanence: string | undefined;
  private roundTrips: string | undefined;

  constructor(
    fullName: string, email: string, birthDate: string, cpf: string, genre: Genre,
    mothersName: string, 
    category: Category, tShirt: TShirt
  ) {
    this.fullName = fullName;
    this.email = email;
    this.birthDate = birthDate;
    this.cpf = cpf;
    this.genre = genre;
    this.mothersName = mothersName;
    this.category = category;
    this.tShirt = tShirt;
  }

  getPersonalData(){
    return {
      fullName: this.fullName,
      email: this.email,
      birthDate: this.birthDate,
      cpf: this.cpf,
      genre: this.genre,
      mothersName: this.mothersName
    }
  }

  setAddressData(address: string, state: string, city: string){
    this.address = address;
    this.state = state;
    this.city = city;
  }

  getAddressData(){
    return {
      address: this.address,
      state: this.state,
      city: this.city
    }
  }

  getCategoryData(){
    return {
      category: this.category
    }
  }

  getTShiftData(){
    return {
      tShirt: this.tShirt
    }
  }

  setEmergencyContactData(fullName?: string, email?: string, phone?: string){
    this.emergencyFullName = fullName;    
    this.emergencyEmail = email;
    this.emergencyPhone = phone;
  }

  getEmergencyContactData(){
    return {
      fullName: this.emergencyFullName,
      email: this.emergencyEmail,
      phone: this.emergencyPhone
    }
  }

  setSocialMediaData(instagram?: string, facebook?: string, tiktok?: string, linkedin?: string, x?: string){
    this.instagram = instagram;
    this.facebook = facebook;
    this.tiktok = tiktok;
    this.linkedin = linkedin;
    this.x = x;
  }

  getSocialMediaData(){
    return {
      instagram: this.instagram,
      facebook: this.facebook,
      tiktok: this.tiktok,
      linkedin: this.linkedin,
      x: this.x
    }
  }

  setCarbonoAttributesData(vehicle?: Vehicle, permanence?: string, roundTrips?: string){
    this.vehicle = vehicle;
    this.permanence = permanence;
    this.roundTrips = roundTrips;
  }

  getCarbonoAttributesData(){
    return {
      vehicle: this.vehicle,
      permanence: this.permanence,
      roundTrips: this.roundTrips
    }
  }
}