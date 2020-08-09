import React from 'react';
import axios from 'axios';
import ListItem from "./ListItem";
import AddItem from "./AddItem";
import { Container, Row, Col } from "react-bootstrap";
import Pagination from "react-js-pagination";
import generateId from "../helpers/functions";

const styles = {
    padding: "20px 50px",
}


export default class List extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: null,
            paginatedList: null,
            error: null,
            page: 1,
            pages: null,
            itemOnPage: 10
        }
    }

    componentDidMount() {
        let storedList = localStorage.getItem('facts');

        if (storedList && storedList.length > 0) {
            let _pages = JSON.parse(storedList).length / 10;
            let _paginatedList = JSON.parse(storedList).slice((this.state.page - 1) * this.state.itemOnPage, (this.state.page - 1) * this.state.itemOnPage + this.state.itemOnPage);
            this.setState({
                list: JSON.parse(storedList),
                pages: _pages,
                paginatedList: _paginatedList
            })
            return;
        }

        let that = this;

        axios({
            method: 'get',
            url: 'https://cat-fact.herokuapp.com/facts',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json; charset=utf-8'
            }
        }).then(function (response) {

            let _list = response.data.all.slice(0, 100);

            let dataForStorage = JSON.stringify(_list);
            localStorage.setItem('facts', dataForStorage);

            let numOfPages = _list.length / 10;

            let _paginatedList = _list.slice((this.state.page - 1) * this.state.itemOnPage, (this.state.page - 1) * this.state.itemOnPage + this.state.itemOnPage);

            that.setState({
                list: _list,
                pages: numOfPages,
                paginatedList: _paginatedList
            });

        }).catch(function (error) {
            that.setState({
                error: error
            })
        });

    }

    addFact = (data) => {

        let listCopy = [...this.state.list];
        let newFact = {
            text: data,
            type: "cat",
            upvotes: 0,
            user: {},
            userUpvoted: null,
            _id: generateId()
        }

        listCopy.unshift(newFact);
        this.setState({
            list: listCopy
        })

        localStorage.setItem('facts', JSON.stringify(listCopy));

    }

    editFact = (data, id) => {

        let listCopy = [...this.state.list];
        let item = listCopy.find(x => x._id === id);
        item.text = data;

        this.setState({
            list: listCopy
        })

        localStorage.setItem('facts', JSON.stringify(listCopy));

    }

    deleteFact = (id) => {

        let modifiedList = [...this.state.list].filter(x => x._id !== id);

        this.setState({
            list: modifiedList
        })

        localStorage.setItem('facts', JSON.stringify(modifiedList));

    }

    putDragedItem = (event) => {

        event.preventDefault();

        const factId = event.dataTransfer.getData("fact_id");

        let listCopy = [...this.state.list];

        let indexOfDroped = listCopy.findIndex(x => x._id === factId);
        let dropedElem = listCopy.find(x => x._id === factId);

        listCopy.splice(indexOfDroped, 1);
        let indexOfOfPrevItem = listCopy.findIndex(x => x._id === event.target.parentElement.id);

        listCopy.splice(indexOfOfPrevItem, 0, dropedElem)

        this.setState({
            list: listCopy
        })

        localStorage.setItem('facts', JSON.stringify(listCopy));

        window.location.reload();
    }

    dragOver = (e) => {
        e.preventDefault();
    }

    handlePageChange = (pageNumber) => {
        const paginatedList = this.state.list.slice((pageNumber - 1) * this.state.itemOnPage, (pageNumber - 1) * this.state.itemOnPage + this.state.itemOnPage);
        this.setState({
            page: pageNumber,
            paginatedList: paginatedList
        });
      }
    


    render() {

        const { list, error, page, pages, itemOnPage, paginatedList } = this.state;

        return (
            <Container fluid style={styles}>
                <Row>
                    <Col xs={9}>
                        <div className="" onDrop={this.putDragedItem} onDragOver={this.dragOver}>
                            {paginatedList && paginatedList.length > 0 ? paginatedList.map((x, index) =>
                                <ListItem item={x} key={x._id} id={x._id} number={itemOnPage * (page - 1) + index + 1} editItem={this.editFact} deleteItem={this.deleteFact} />
                            )
                                : error ?
                                    <p>Sorry, but there is no answer from server</p>
                                    :
                                    <p>Data is loading ...</p>}
                        </div>
                    </Col>
                    <Col xs={3}>
                        <AddItem isDisabled={list ? false : true} addItem={this.addFact} />
                    </Col>
                </Row>
                <Row>
                    <Col xs={12}>
                        {pages && page && <Pagination
                            activePage={page}
                            itemsCountPerPage={itemOnPage}
                            totalItemsCount={list.length}
                            pageRangeDisplayed={5}
                            onChange={this.handlePageChange}
                        />}
                    </Col>
                </Row>
            </Container>
        );
    }
}

