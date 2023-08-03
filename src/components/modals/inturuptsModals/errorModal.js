import PdfModal from "../pdfModal/pdfModal";
import "../pdfModal.css";

const ErrorModal = (props)=>{

    return (
        <div className="pdf-container">
            <PdfModal id={props.id} />
        </div>
    );
}

export default ErrorModal;