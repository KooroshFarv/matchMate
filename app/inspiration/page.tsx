import {inspirationImages } from "../data/images";

const InspirationPage = () => {
    return ( 
        <>
        <div className="grid md:grid-cols-3 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {inspirationImages.map((url, index) => (
                <img src={url} alt={`inspiration ${index}`} key={index}
                className="w-full h-auto shadow-md object-cover rounded-lg"
                />
            ))}
        </div>
        </>
     );
}
 
export default InspirationPage;