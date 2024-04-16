export class FieldsId {
  public prefix = '#enrollment_';
  public personalData = {
    prefix: this.prefix,
    fullName(): string { return this.prefix + 'name'},
    email(): string { return this.prefix + 'email'},
    birthDate(): string { return this.prefix + 'birth_date'},
    cpf(): string { return this.prefix + 'cpf'},
    gender(): string { return this.prefix + 'gender'},
    mothersName(): string { return this.prefix + 'mothers_name'},
  }
  public addressData = {
    prefix: this.prefix,
    address(): string { return this.prefix + 'address'},
    state(): string { return this.prefix + 'state_id'},
    city(): string { return this.prefix + 'city_id'}
  }
  public categoryData = {
    prefix: this.prefix,
    category(): string { return this.prefix + 'category'}
  }
  public tShirtData = {
    prefix: this.prefix + 't_shirt_size_',
    p(): string { return this.prefix + 'p'},
    m(): string { return this.prefix + 'm'},
    g(): string { return this.prefix + 'g'},
    gg(): string { return this.prefix + 'gg'},
    eg(): string { return this.prefix + 'eg'}
  }

  public healthInsuranceData = {
    prefix: this.prefix + 'health_insurance_',
    true(): string { return this.prefix + 'true'},
    false(): string { return this.prefix + 'false'},
    kind(): string { return this.prefix + 'kind'}
  }

  public emergencyContactData = {
    prefix: this.prefix + 'emergency_contact_',
    fullName(): string { return this.prefix + 'name'},
    email(): string { return this.prefix + 'email'},
    phone(): string { return this.prefix + 'phone'}
  }

  public socialMediaData = {
    prefix: this.prefix + 'social_media_',
    instagram(): string { return this.prefix + 'insta'},
    facebook(): string { return this.prefix + 'face'},
    tiktok(): string { return this.prefix + 'tiktok'},
    linkedin(): string { return this.prefix + 'linkedin'},
    x(): string { return this.prefix + 'twitter'}
  }

  public carbonoAttributesData = {
    prefix: this.prefix + 'carbono_attributes_',
    vehicleSelect: {
      id: this.prefix + 'veiculo_evento',
      ownVehicle: 'veiculo_proprio',
      rentedVehicle: 'veiculo_alugado',
      app: 'aplicativo',
      bike: 'moto',
      bus: 'onibus',
      other: 'other',
    },
    fuelSelect: {
      id: this.prefix + 'combustivel_evento',
      gasoline: 'gasolina',
      diesel: 'diesel',
      alcool: 'alcool',
      eletric: 'eletric',
      gas: 'gas',
    },
    plane(): string { return this.prefix + 'veiculo_aviao'},
    bus(): string { return this.prefix + 'veiculo_onibus'},
    ownVehicle(): string { return this.prefix + 'veiculo_veiculo_proprio'},
    rentedVehicle(): string { return this.prefix + 'veiculo_veiculo_alugado'},
    permanence(): string { return this.prefix + 'permanencia'},
    roundTrips(): string { return this.prefix + 'idas_voltas'}
  }

  public polices = 'polices';

}