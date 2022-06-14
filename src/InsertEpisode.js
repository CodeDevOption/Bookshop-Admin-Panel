import { Autocomplete, Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl,Stack, TextField } from '@mui/material'
import { collection, doc, onSnapshot, orderBy, query, setDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import AdminHeader from './AdminHeader'
import { db } from './firebase';
import './InsertEpisode.css'

function InsertEpisode() {

//=================================== Episode Id Generate ===================================
var today = new Date();
// returns year as YY
var year = today.getFullYear().toString();
// returns month
var month = today.getMonth().toString();
if(month.length == 1){
 month = "0"+month;
}
// returns day 
var day = today.getDate().toString();
if(day.length == 1){
 day = "0"+day;
}
// returns hours
var hours = today.getHours().toString();
if(hours.length == 1){
 hours = "0"+hours
}
// returns minutes
var minutes = today.getMinutes().toString();
if(minutes.length == 1){
 minutes = "0"+minutes;
}
// returns seconds
var seconds = today.getSeconds().toString();
if(seconds.length == 1){
 seconds = "0"+seconds;
}
// returns formatted date
var formatedDate = year.substr(2, 3)+month+day+"."+hours+minutes+seconds;
const EpisodeID = parseFloat(formatedDate);
// ========================================= useState__Values =========================================== 

  const collectionRef1= collection(db,"Episode");
  const [open, setOpen] = useState(false);
  const [Albumname, Setalbumname] = useState();
  const [Epititle,SetEpiTitle] = useState('');
  const [Epicontent,SetEpiContent] = useState('');
  const[AlbumName,SetAlbumName] = useState([])

//======================== Uplode Data ======================================
  const uplodeData = ()=> {
    const data = {EpisodeID:EpisodeID,AlbumName:Albumname,EpisodeTitle:Epititle,EpisodeContent:Epicontent}
    setDoc(doc(db, "Episode", `${EpisodeID}`), data).then(()=>{
          Setalbumname('');
          SetEpiTitle('');
          SetEpiContent('');
    }).catch((error)=>{
      console.log(error);
      })
  } 
//Get album Names from Database
useEffect(()=>{
  const collectionRef = collection(db,'Album');
  const q = query(collectionRef,orderBy('AlbumID','desc'))
onSnapshot(q, (snapshot) => {
  SetAlbumName(snapshot.docs.map((doc) => doc.data()));
});
},[])

const handleClickOpen = () => {
    setOpen(true);
};

const handleClose = () => {
    setOpen(false);
  };
  
return (
<div className="episode">
  {/* Import AdminHeader */}
  <AdminHeader />
  <div className="epibody">
      <h2>Insert Episode</h2>
      <div className="ditails">
          <button className='epibtn' onClick={handleClickOpen}>Choose Album</button>
          <input autoComplete='off'  type="text" value={Epititle} onChange={(e) => SetEpiTitle(e.target.value)} name="epititle" id="epititle" placeholder='Title'/>
          <input autoComplete='off'  type="text" value={Epicontent} onChange={(e) => SetEpiContent(e.target.value)} name="epicontent" id="epicontent" placeholder='Content'/>
          <button onClick={uplodeData} className='episbtn' id='savebtn'>Save</button>
      </div>
      <Dialog   open={open} onClose={handleClose}>
          <DialogTitle>Choose Album</DialogTitle>
          <DialogContent>
              <br />
              <FormControl sx={{ m: 1, width: 300, mt: 3 }}>
                  <Stack>
                      <Autocomplete 
                      options={AlbumName.map((d)=> d.AlbumName)}
                      renderInput={ (parms)=> <TextField {...parms} label='select' /> }
                      value = {Albumname}
                      onChange={(d)=> Setalbumname(d.target.textContent)}
                      />
                  </Stack>
              </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Select</Button>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
  </div>
</div>

  )
}

export default InsertEpisode