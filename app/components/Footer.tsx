// const Footer = () => {
//     return ( <div>
//         <div>
//             Made with ❤️ by <a href="https://www.linkedin.com/in/chriskeating-data/">Chris Keating</a>
//         </div>
//         <div>
//             Feedback? Email me at <a href="mailto:ckeating.nh@gmail.com">ckeating.nh@gmail.com</a>
//         </div>
//     </div> );
// }
 
// export default Footer;

const Footer = () => {
    return (
        <div className="bg-blue-500 text-white py-6 px-4 mt-10">
            <div className="text-center mb-4">
                Made with ❤️ by Mobile Communications, Inc. (really just {" "}
                <a 
                    href="https://www.linkedin.com/in/chriskeating-data/" 
                    className="underline hover:text-white"
                >
                    Chris Keating
                </a> haha)
            </div>
            <div className="text-center">
                Feedback? Email me at{" "}
                <a 
                    href="mailto:ckeating.nh@gmail.com" 
                    className="underline hover:text-white"
                >
                    ckeating.nh@gmail.com
                </a>
            </div>
        </div>
    );
}

export default Footer;
