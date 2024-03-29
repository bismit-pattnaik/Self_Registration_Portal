import React, { useRef,useEffect, useState } from 'react'
import './PatientCard.css'
import DefaultPatient from  "../../Assests/Images/defaultPatient.svg";
import phoneIcon from "../../Assests/Images/phoneIcon.svg";
import emailIcon from "../../Assests/Images/emailIcon.svg";

function PatientCard(props) {

const newRegisteredPatientDetails = JSON.parse(localStorage.getItem('NewRegisteredPatientDetails'));
const alreadyRegisteredPatientDetails = JSON.parse(localStorage.getItem('AlreadyRegisteredPatientDetails'));

const [patientCardDetails,SetPatientCardDetails] = useState({
  photo:'',
  headerName:'',
  gender:'',
  age:'',
  dob:'',
  registeredOn:'',
  aadharNumber:'',
  contactNo:'',
  emailId:'',
  village:'',
  city:'',
  isRural:'',
  locality:'',
  postOffice:'',
  policeStation:'',
  pincode:'',
  district:'',
  state:'',
  country:''
});

useEffect(() => {
  if(props.NewRegisterBookConsultationIsCalled){
    const middleName = newRegisteredPatientDetails.middleName === null ? '' : newRegisteredPatientDetails.middleName;
    const lastName = newRegisteredPatientDetails.lastName === null ? '': newRegisteredPatientDetails.lastName;
    const creationTimeStamp = newRegisteredPatientDetails.creationTimeStamp
      ? new Date(newRegisteredPatientDetails.creationTimeStamp)
      : null;
    const addressList = newRegisteredPatientDetails.addressList[0];
    SetPatientCardDetails({
      //Checking NA here since Sending NA when photo is not available while Registering
      photo:newRegisteredPatientDetails.photo === 'NA' ? null:newRegisteredPatientDetails.photo,
      headerName:newRegisteredPatientDetails.prefix + " "+ newRegisteredPatientDetails.firstName + " " +middleName +" "+ lastName,
      gender:newRegisteredPatientDetails.gender,
      age:newRegisteredPatientDetails.ageStr,
      dob:newRegisteredPatientDetails.dobStr,
      registeredOn: creationTimeStamp
      ? `${creationTimeStamp.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}, ${creationTimeStamp.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric' })}`
      : '',
      aadharNumber:newRegisteredPatientDetails.aadhaarNumber,
      contactNo:newRegisteredPatientDetails.contactNo,
      emailId:newRegisteredPatientDetails.email,
      village:addressList.village,
      city:addressList.cityName,
      isRural:addressList.isRural,
      locality:addressList.locality,
      postOffice:addressList.postOffice,
      policeStation:addressList.policeStation,
      pincode:addressList.pin,
      district:addressList.districtName,
      state:addressList.stateName,
      country:addressList.countryName
    })

  }else{
    const prefix = (alreadyRegisteredPatientDetails.prefix === '' || alreadyRegisteredPatientDetails.prefix === null) ? '' : alreadyRegisteredPatientDetails.prefix;
    const middleName = (alreadyRegisteredPatientDetails.middleName === '' || alreadyRegisteredPatientDetails.middleName === null || alreadyRegisteredPatientDetails.middleName === 'NA') ? '' : alreadyRegisteredPatientDetails.middleName;
    const lastName = (alreadyRegisteredPatientDetails.lastName === '' || alreadyRegisteredPatientDetails.lastName === null || alreadyRegisteredPatientDetails.lastName === 'NA') ? '' : alreadyRegisteredPatientDetails.lastName;
    const addressList = alreadyRegisteredPatientDetails.addressList[0];
    SetPatientCardDetails({
      photo:alreadyRegisteredPatientDetails.photo === 'NA' ? null:alreadyRegisteredPatientDetails.photo,
      headerName:prefix + " "+ alreadyRegisteredPatientDetails.firstName + " " +middleName +" "+  lastName,
      gender:alreadyRegisteredPatientDetails.gender,
      age:alreadyRegisteredPatientDetails.ageStr,
      dob:alreadyRegisteredPatientDetails.dobStr,
      registeredOn: alreadyRegisteredPatientDetails.registrationDateTime,
      contactNo:alreadyRegisteredPatientDetails.contactNo,
      emailId:alreadyRegisteredPatientDetails.email,
      village:addressList.village,
      city:addressList.cityName,
      locality:addressList.locality,
      postOffice:addressList.postOffice,
      policeStation:addressList.policeStation,
      pincode:addressList.pin,
      district:addressList.districtName,
      state:addressList.stateName,
      country:addressList.countryName
    })
  }
}, []);

// //Adding this section to check if the name is of larger length to roll it over
// const headerRef = useRef(null);
// const [isMarquee, setIsMarquee] = useState(false);

// useEffect(() => {
//   if (headerRef.current) {
//     const isOverflowing = headerRef.current.scrollWidth > headerRef.current.clientWidth;
//     setIsMarquee(isOverflowing);
//   }
// }, [patientCardDetails.headerName]); // Recheck when headerName changes

  return (
    <div className='mainPatientCard'>
      
      <div className='patientPhoto'>
      <div style={{border:'groove', borderColor:'#f0ffff34', height:'170px', display:'flex', alignItems:'center', justifyContent:'center' }}>
           <img className='patientImageCard' src={patientCardDetails.photo || DefaultPatient} alt="Patient" />
         </div>

      </div>

     
      <div className='PatientInfo'>

      <div style={{display:'flex', flexDirection:'row', gap:'17px'}}>  
      {/* <div className={`HeaderName ${isMarquee ? 'marquee' : ''}`} ref={headerRef}>
      {patientCardDetails.headerName}
    </div> */}
      <div className='HeaderName'>
      {patientCardDetails.headerName.length > 23 ?
        `${patientCardDetails.headerName.slice(0, 23)}...` :
        patientCardDetails.headerName
      }
    </div>

    
        <div className='genderShow'>
          <div className='genderShowround'>
          {patientCardDetails.gender}
          </div>  
        </div>
     </div>

    <div style={{display:'flex', flexDirection:'row',paddingTop:'8px'}}>
     <div className='subHeader'>
       Age : 
     </div>
     <div className='subtitle'>
       {patientCardDetails.age} ({patientCardDetails.dob})
     </div>
    </div>

    <div style={{display:'flex', flexDirection:'row',paddingTop:'8px'}}>
     <div className='subHeader'>
       Registered on :
     </div>
     <div className='subtitle'>
       {patientCardDetails.registeredOn}
     </div>
    </div>

    <div style={{display:'flex', flexDirection:'row',paddingTop:'8px'}}>
     <div className='subHeader'>
       Aadhaar Number :
     </div>
     <div className='subtitle'>
        {patientCardDetails.aadharNumber}
     </div>
    </div>

    <div style={{display:'flex', flexDirection:'row', gap:'20px',paddingTop:'8px'}}>
     <div className=''>
     <img src={phoneIcon} alt="Phone" />
     </div>
     <div className='subtitle'>
       {patientCardDetails.contactNo}
     </div>
    </div>

    <div style={{display:'flex', flexDirection:'row', gap:'20px',paddingTop:'8px'}}>
     <div className=''>
     <img src={emailIcon} alt="Email" />
     </div>
     <div className='subtitle'>
      {patientCardDetails.emailId}
     </div>
    </div>


      </div>

      <div className='AddressInfo'>
        
        <div className='AdressHeader'>
         ADDRESS DETAILS
        </div>

        <div style={{display:'flex', flexDirection:'row', gap:'22px', paddingTop:'15px' }}>
        {patientCardDetails.isRural === true ? (
          <>
            <div className='addressSubheader'>
              Village :
            </div>
            <div className='addresstitle'>
              {patientCardDetails.village}
            </div>
            </>
        ):(
          <>
          <div className='addressSubheader'>
              City :
            </div>
            <div className='addresstitle'>
              {patientCardDetails.city}
            </div>
            </>
        )}

            <div className='addressSubheader'>
              Pin-Code :
            </div>
            <div className='addresstitle'>
              {patientCardDetails.pincode}
            </div>
        </div>

        <div style={{display:'flex', flexDirection:'row', gap:'22px', paddingTop:'10px' }}>
            <div className='addressSubheader'>
              Locality :
            </div>
            <div className='addresstitle'>
             {patientCardDetails.locality}
            </div>

            <div className='addressSubheader'>
            Distict :
            </div>
            <div className='addresstitle'>
           {patientCardDetails.district}
            </div>
        </div>

        <div style={{display:'flex', flexDirection:'row', gap:'22px', paddingTop:'10px' }}>
            <div className='addressSubheader'>
              Post Office :
            </div>
            <div className='addresstitle'>
             {patientCardDetails.postOffice}
            </div>

            <div className='addressSubheader'>
              State :
            </div>
            <div className='addresstitle'>
             {patientCardDetails.state}
            </div>
        </div>

        <div style={{display:'flex', flexDirection:'row', gap:'22px', paddingTop:'10px' }}>
            <div className='addressSubheader'>
              Police Station :
            </div>
            <div className='addresstitle'>
              {patientCardDetails.policeStation}
            </div>

            <div className='addressSubheader'>
              Country :
            </div>
            <div className='addresstitle'>
             {patientCardDetails.country}
            </div>
        </div>



      </div>

    </div>
  )
}

export default PatientCard