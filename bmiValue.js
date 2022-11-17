module.exports = (index)=>{
  if(index < 16){
    return 'falls within the underweight range'
  }

  if( index > 16 && index < 18.5){
    return 'falls within the underweight range'
  }

    if( index > 18.5 && index < 25){
    return 'falls within the healthy weight range'
  }

  if( index > 25 && index < 35){
    return 'falls within the overweight range'
  }

  if( index > 30 && index < 35){
    return 'falls within the obesity range'
  }

  if( index > 35 && index < 40){
    return 'falls within the obesity 2nd range'
  }

  if( index > 40){
    return 'falls within the obesity 3d range'
  }

}
