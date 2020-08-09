import React, {useState} from 'react';
import { Form, Button } from "react-bootstrap"

const styles = {
   div: {
       display: "flex",
       padding: "15px 0",
       justifyContent: "flex-start",
       position: "relative",
       fontSize: "17px"
   },
    formBtns: {
        margin: "0 10px 0 0 "
    },
    deleteBtn: {
        position: "absolute",
        left: "-3%"
    }
}

const ListItem = (props) => {

    let defaultText = props.item.text;
    let id = props.item._id;

    const [status, setStatus] = useState(false);
    const [fact, editFact] =  useState(defaultText);

    const save = (e) => {
        e.preventDefault();

        if(defaultText === fact) {
            setStatus(!status);
            return;
        } 

        props.editItem(fact, id);
        setStatus(!status);
    }

    const hideForm = () => {
        setStatus(!status);
    }

    const deleteItem = () => {
        props.deleteItem(id);
    }

    const saveDragedItem = (e) => {

        const target = e.target;
        e.dataTransfer.setData("fact_id", target.id);

        setTimeout(() => {
            target.style.display = "none";
        }, 0)
    }


    return (
        <>
            {!status &&
                <div id={id} draggable={true} onDragStart={saveDragedItem} style={styles.div}>
                    <span>{props.number + ". "}</span>
                    <p style={styles.p} onDoubleClick={() => setStatus(!status)}>{fact}</p>
                    <button onClick={deleteItem} type="button" className="btn btn-dark" style={styles.deleteBtn}> x </button>
                </div>}
            {status && <Form>
                <Form.Group>
                    <Form.Label>Edit mode is on</Form.Label>
                    <Form.Control type="text" value={fact} onChange={(e) => editFact(e.target.value)}/>
                </Form.Group>
                <Button variant="primary" type="submit" onClick={save} style={styles.formBtns}>
                    Save
                </Button>
                <Button variant="danger" type="button" onClick={hideForm} style={styles.formBtns}>
                    Cancel
                </Button>
            </Form>}
        </>
    )
}

export default ListItem