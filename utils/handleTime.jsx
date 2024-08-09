export default function handleTime(Getdate){
    let formattedDate ;

    if(Getdate){
        let date = new Date(Getdate);
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        formattedDate = date.toLocaleDateString('en-US', options);
    }

    return formattedDate

}