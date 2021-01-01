import { userdata } from "./userdata"
const mihome = require('node-mihome');
// local miIO
mihome.miioProtocol.init();

// local Aqara (ZigBee)
mihome.aqaraProtocol.init();

const username = userdata.getUsername; 
const password = userdata.getPassword;
const deviceAirPurifier = 'zhimi.airpurifier.ma4'

const login = async function() {
    try{
      await mihome.miCloudProtocol.login(username, password);
      console.log('LOGIN - SUCCESS')
    }catch(err){
      console.log('ERRORE LOGIN: ' + err)
    }
}
setTimeout(()=>{login()}, 5000);
//const options = { country: 'de' }; 

const device = mihome.device({
  id: userdata.getId,
  model: deviceAirPurifier, 

  address: userdata.getAddress,
  token: userdata.getToken,
  refresh: 30000, 
  
  parent: '', 
});
device.on('properties', (data) => {
  console.log('DEVICE ON')
  console.log(data);
  console.log('POWER: ', device.getPower())
});

const setLcdBrightness = async function() { 
  try{
    await device.setPower(true); //activate mi air 
    console.log('Mode set: ', device.getMode() ) 
  }catch(err){
    console.log('ERRORE: ', err)
  }
} // call the method
const initDevice = async function() { 
  try{
  await device.init();}
  catch(err){
    console.log('ERROR INIT', err)
  } }

setTimeout(()=>{initDevice()}, 10000);
setTimeout(()=>{setLcdBrightness()}, 20000);
setTimeout(()=>{device.destroy();}, 45000);
