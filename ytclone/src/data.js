export const API_KEY="AIzaSyBqChUXpjYE0WHZvBhC551Z5LKvFWifSe8";

export const value_convertor=(value)=>{
    if(value>=1000000){
        return Math.floor (value/1000000)+"M";
    }
   else if(value>=1000){
        return Math.floor (value/1000)+"k";
    }
    else{
        return value;
    }
}