export const initialState = {
    Searchtags:[],

};

const reducer = (state,action)=>{

    switch (action.type) {
        
      case "ADD_Tags":
          return {
            ...state,
            Searchtags: [...state.Searchtags, action.tag],
          };
      case "Remove_tag":
          const index = state.Searchtags.findIndex((basketitem) => basketitem.id === action.id);
          const newtag = [...state.Searchtags];
          if(index >=0){
              newtag.splice(index,1);
          }else{
                  console.warn(`Cant Remove Product (Id: ${action.id} as not in SearchTagList`);
                }
             
          return {...state,
                Searchtags:newtag,
            }
      case "Clear":
        const cleartag = [];
        return {...state,
          Searchtags:cleartag,
      }
        default:
           return state;
}
}
export default reducer