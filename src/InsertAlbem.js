import React, { useState } from 'react'
import AdminHeader from './AdminHeader'
import './InsertAlbem.css'
import { db , storage} from './firebase'
import { collection,setDoc, doc } from 'firebase/firestore'
import {getDownloadURL, ref, uploadBytes} from 'firebase/storage'
import Searchtag from './Serchtag'
import { useStateValue } from './StateProvider'


function InsertAlbem() {

//=================================== Albem Id Generate ===================================
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
  const AlbumID = parseFloat(formatedDate);
// ========================================= useState__Values =========================================== 
    const[{Searchtags},dispatch] = useStateValue();
    const collectionRef = collection(db,'Album');
    const[ImagePriview,setImagePriview] = useState(null);
    const [SlectImage,setselected] = useState([]);
    const[Error,setError] = useState(false);
    const[AuthorName,SetAuthorName] = useState('');
    const[epiCount,SetEpiCount] = useState('');
    const[PreviewText,SetPreviewText] = useState('');
    const[TagLine,SetTagLine] = useState('');
    const[Category,SetCategory] = useState('');
    const[AlbumName,SetAlbumName] = useState('');
    const[SearchTag,SetSearchTag] = useState('');
    const[ImageURL,setImageURL] =useState('');
    const imageRef = ref(storage,`images/${SlectImage.name}`);
    const rand = hours+minutes+seconds;
    const id = parseInt(rand);
    const[uplod,setuplod] = useState(false);

// ==============================Preview Image========================================

  const handleImgaeChange = (e)=>{ 
  const selected =  e.target.files[0];
  setselected(selected);
  const ALLOW_FILES = ["image/jpeg","image/jpg","image/png",];
  if(selected && ALLOW_FILES.includes(selected.type)){
    let reader = new FileReader();
      reader.onloadend = ()=>{
        setImagePriview(reader.result);
        setselected(selected);
        setuplod(true);
      }
    reader.readAsDataURL(selected);
  }else{
    setError(true);
    alert("Image File Type Not Support")
  }
}


//================================== Send Data To Firebase Firestore==================================

//image Uplode Firebase Store
  const SubmitData =()=>{
  if(uplod){
  uploadBytes(imageRef,SlectImage).then(()=>{
      getDownloadURL(imageRef).then((url)=>{
        SendData(url);
      })
  });
  }else{
    SendData("");
  }
  }

 const SendData = (url)=>{
  const EpiCount = parseInt(epiCount);
  const SearchTags = Searchtags.map((e)=> e.name );
  const data = {AlbumID:AlbumID ,AuthorName:AuthorName,CoverURL:url,AlbumName:AlbumName,CategoryID:parseInt(Category),EpiCount:EpiCount,PreviewText:PreviewText,SearchTags:SearchTags,Tagline:TagLine,};

setDoc(doc(db, "Album", `${AlbumID}`), data).then(()=>{
 
// Clear Form To After Sed Data
  SetAlbumName('')
  SetAuthorName('');
  SetEpiCount('');
  SetPreviewText('');
  SetTagLine('');
  setselected([]);
  setImageURL('');
  setImagePriview(null);
  setuplod(false);
  dispatch({
     type:"Clear",
           });

}).catch((error)=>{
  console.log(error);
})

 }
// Add Search Tags To Arrry
  const AddList = ()=>{
    //Dispatch to Data layer 
      dispatch({
        type:"ADD_Tags",
        
        tag:{
          id:id,
          name:SearchTag
        },
      });
      SetSearchTag('');
}
//Remove  Preview Image
 const remove = ()=>{
  setImagePriview(null);
  setuplod(false);
  setselected([]);
  }

  return (
<div className="admin__section">
  {/* Import AdminHeader */}
  <AdminHeader />  
  {/* Body Container */}
  <div className="body">
    <h2>Insert Albem</h2>
    <div className="ditails">
        <div className="leftSide">
          <div className="imageup">
              <div className="imgUplod"
              style={{background: ImagePriview? `url("${ImagePriview}") no-repeat center/cover `: "#8EBEF5"} }
              >
                  {!ImagePriview && (
                    <>
                    <label htmlFor="image"> Choose Image</label>
                    </>
                  )}

                  <input type="file" onChange={handleImgaeChange} name="img" id="image" />
              </div>
              {
                ImagePriview &&(
                <>
                  <button onClick={remove}>Remove Image</button>
                </>
                )
              }
              
          </div>
          <input autoComplete='off'  type="text" value={AlbumName} onChange={e=> SetAlbumName(e.target.value)} name="album_name" id="album_name" placeholder='Album Name'/>
          <input autoComplete='off'  type="text" value={AuthorName} onChange={e  => SetAuthorName(e.target.value)} name="author_name" id="author_name" placeholder='Author Name' />
          <div className="Radiobtn">
              <h5>Category</h5>
              <div className="one_line">
                  <label htmlFor="">Category 01</label><input value={parseInt(1)} onChange={e => SetCategory(e.target.value)} type="radio" name="category" id="" />
                  <label htmlFor="">Category 02</label><input value={parseInt(2)} onChange={e => SetCategory(e.target.value)} type="radio" name="category" id="" />
              </div>
              <div className="second_line">
                  <label htmlFor="">Category 03</label><input value={parseInt(3)} onChange={e => SetCategory(e.target.value)} type="radio" name="category" id="" />
                  <label htmlFor="">Category 04</label><input value={parseInt(4)} onChange={e => SetCategory(e.target.value)} type="radio" name="category" id="" />
              </div>
          </div>

        </div>
        <div className="RightSide">
            <div className="searctag">
                  <input autoComplete='off'  type="text" name="Search_tags" value={SearchTag} onChange ={e => SetSearchTag(e.target.value)} placeholder='Search Tags' id="Search_tags" />
                  <button onClick={AddList}>Add</button>
            </div>
            <div className="tags">
              {/* ================== Display Search Tags ==================  */}
                { Searchtags.map((tag)=>(
                    <Searchtag key={tag.id}  id={tag.id} name= {tag.name} />
                  ))
                }
            </div>
            <input autoComplete='off'  type="text"  value={epiCount} onChange={e  => SetEpiCount(e.target.value)}name="epi_count" id="epi_count" placeholder='Epi Count' />
            <input autoComplete='off'  type="text"  value={PreviewText} onChange={e  => SetPreviewText(e.target.value)}name="preview_text" id="preview_text" placeholder='Preview Text' />
            <input autoComplete='off'  type="text" value={TagLine} onChange={e  => SetTagLine(e.target.value)} name="tas_line" id="tas_line"  placeholder='TagLine'/>
            <button id='savebtn' onClick={SubmitData} >Save</button>
        </div>
    </div>
  </div>
</div>

  )
}

export default InsertAlbem