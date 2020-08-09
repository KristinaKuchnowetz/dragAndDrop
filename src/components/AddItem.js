import React, {useState} from "react";
import {Form, Button} from "react-bootstrap"

const styles = {
    btn: {
        margin: "20px 0"
    },
    formBtns: {
        margin: "0 10px 0 0 "
    }
}


const AddItem = (props) => {

    let defaultText = "";

    const [status, setStatus] = useState(false);
    const [text, addText] =  useState(defaultText);

    const save = (e) => {
        e.preventDefault();

        let usersInput = text.trim();
        if(usersInput.length === 0) {
            addText(defaultText);
            setStatus(!status);
            return;
        } 

        props.addItem(text);
        addText(defaultText);
        setStatus(!status);
    }

    const hideForm = () => {
        addText(defaultText);
        setStatus(!status);
    }

    return (
        <>
            <button onClick={() => setStatus(!status)} disabled={props.isDisabled} type="button" className="btn btn-info" style={styles.btn}>Add new fact</button>
            {status && <Form>
                <Form.Group>
                    <Form.Label>Your fact here</Form.Label>
                    <Form.Control type="text" value={text} onChange={(e) => addText(e.target.value)}/>
                </Form.Group>
                <Button variant="primary" type="submit" onClick={save} style={styles.formBtns}>
                    Add
                </Button>
                <Button variant="danger" type="button" onClick={hideForm} style={styles.formBtns}>
                    Cancel
                </Button>
            </Form>}
        </>
    )
}

export default AddItem

