import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import { Container, Button, Table, FormControl, Modal } from "react-bootstrap";

const App = () => {
    const [data, setData] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [modalText, setModalText] = useState("");
    const [showFilter, setShowFilter] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [filterTitle, setFilterTitle] = useState("");
    const [filterGenre, setFilterGenre] = useState("");
    const [editingIndex, setEditingIndex] = useState(undefined);
    const [inputData, setInputData] = useState({
        title: "",
        views: "",
        genre: "",
        descriptions: "",
    });
    const [formData, setFormData] = useState({
        title: "",
        views: "",
        genre: "",
        descriptions: "",
    });

    const handleCloseModal = () => setShowModal(false);
    const handleShowModal = (text) => {
        setModalText(text);
        setShowModal(true);
    };

    const handleShowFilter = () => {
        if (showFilter) {
            setShowFilter(false);
            setFilterTitle("");
            setFilterGenre("");
        } else {
            setShowFilter(true);
        }
        setShowForm(false);
    };

    const handleEdit = (value, index) => {
        setEditingIndex(index);
        setInputData(value);
        setShowForm(false);
    };

    const handleShowForm = () => {
        setShowForm(!showForm);
        setEditingIndex(undefined);
        setShowFilter(false);
    };

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        try {
            const response = await axios.get(
                "https://github-exercise-c070e-default-rtdb.asia-southeast1.firebasedatabase.app/filmCrud.json"
            );
            console.log(response);
            setData(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleSave = async (index) => {
        if (
            inputData.title &&
            inputData.views &&
            inputData.genre &&
            inputData.descriptions
        ) {
            try {
                const response = await axios.put(
                    `https://github-exercise-c070e-default-rtdb.asia-southeast1.firebasedatabase.app/filmCrud/${index}.json`,
                    {
                        ...inputData,
                    }
                );
                console.log(response);
            } catch (error) {
                console.error(error);
            }
            setEditingIndex(undefined);
            getData();
        }
    };

    const handleSubmitForm = async () => {
        if (
            formData.title &&
            formData.views &&
            formData.genre &&
            formData.descriptions
        ) {
            try {
                // const response = await axios.post(
                //     `https://github-exercise-c070e-default-rtdb.asia-southeast1.firebasedatabase.app/filmCrud.json`,
                const response = await axios.put(
                    `https://github-exercise-c070e-default-rtdb.asia-southeast1.firebasedatabase.app/filmCrud/${data.length}.json`,
                    {
                        ...formData,
                    }
                );
                console.log(response);
                setFormData({
                    title: "",
                    views: "",
                    genre: "",
                    descriptions: "",
                });
            } catch (error) {
                console.error(error);
            }
            setShowForm(false);
            getData();
        }
    };

    const handleDelete = async (index) => {
        try {
            const response = await axios.delete(
                `https://github-exercise-c070e-default-rtdb.asia-southeast1.firebasedatabase.app/filmCrud/${index}.json`
            );
            console.log(response);
        } catch (error) {
            console.error(error);
        }
        getData();
    };

    return (
        <>
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Body>{modalText}</Modal.Body>
                <Modal.Footer>
                    <Button variant="light" onClick={handleCloseModal}>
                        closed
                    </Button>
                </Modal.Footer>
            </Modal>

            <Container>
                <h1 className="mb-5">FILM</h1>
                <div className="content">
                    <Button variant="dark mb-3 me-2" onClick={handleShowFilter}>
                        filter
                    </Button>
                    <Button variant="primary mb-3" onClick={handleShowForm}>
                        add
                    </Button>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>title</th>
                                <th>view</th>
                                <th>genre</th>
                                <th>description</th>
                                <th>action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {showFilter && (
                                <tr>
                                    <th></th>
                                    <td>
                                        <FormControl
                                            type="text"
                                            size="sm"
                                            value={filterTitle}
                                            onChange={(event) =>
                                                setFilterTitle(
                                                    event.target.value
                                                )
                                            }
                                            autoFocus
                                        />
                                    </td>
                                    <td></td>
                                    <td>
                                        <FormControl
                                            type="text"
                                            size="sm"
                                            value={filterGenre}
                                            onChange={(event) =>
                                                setFilterGenre(
                                                    event.target.value
                                                )
                                            }
                                        />
                                    </td>
                                    <td></td>
                                    <td></td>
                                </tr>
                            )}
                            {showForm && (
                                <tr>
                                    <th>{data.length + 1}</th>
                                    <td>
                                        <FormControl
                                            type="text"
                                            size="sm"
                                            value={formData.title}
                                            onChange={(event) =>
                                                setFormData({
                                                    ...formData,
                                                    title: event.target.value,
                                                })
                                            }
                                            autoFocus
                                        />
                                    </td>
                                    <td>
                                        <FormControl
                                            type="number"
                                            size="sm"
                                            value={formData.views}
                                            onChange={(event) =>
                                                setFormData({
                                                    ...formData,
                                                    views: event.target.value,
                                                })
                                            }
                                        />
                                    </td>
                                    <td>
                                        <FormControl
                                            type="text"
                                            size="sm"
                                            value={formData.genre}
                                            onChange={(event) =>
                                                setFormData({
                                                    ...formData,
                                                    genre: event.target.value,
                                                })
                                            }
                                        />
                                    </td>
                                    <td>
                                        <FormControl
                                            type="text"
                                            size="sm"
                                            value={formData.descriptions}
                                            onChange={(event) =>
                                                setFormData({
                                                    ...formData,
                                                    descriptions:
                                                        event.target.value,
                                                })
                                            }
                                        />
                                    </td>
                                    <td>
                                        <i
                                            className="fas fa-cloud-upload-alt text-success"
                                            onClick={handleSubmitForm}
                                        ></i>
                                    </td>
                                </tr>
                            )}
                            {data
                                .filter(
                                    (value) =>(
                                        (
                                            value !== null &&
                                            value.title.toLowerCase().includes(filterTitle.toLowerCase()) &&
                                            value.genre.toLowerCase().includes(filterGenre.toLowerCase())
                                        ) || 
                                        value === null
                                    )
                                )
                                .map((value, index) =>
                                    value !== null && (
                                        <tr key={index}>
                                            <th scope="row">{index + 1}</th>
                                            <td>
                                                {editingIndex === index ? (
                                                    <FormControl
                                                        type="text"
                                                        size="sm"
                                                        value={inputData.title}
                                                        onChange={(event) =>
                                                            setInputData({
                                                                ...inputData,
                                                                title: event
                                                                    .target
                                                                    .value,
                                                            })
                                                        }
                                                        autoFocus
                                                    />
                                                ) : (
                                                    value.title
                                                )}
                                            </td>
                                            <td>
                                                {editingIndex === index ? (
                                                    <FormControl
                                                        type="number"
                                                        size="sm"
                                                        value={inputData.views}
                                                        onChange={(event) =>
                                                            setInputData({
                                                                ...inputData,
                                                                views: event
                                                                    .target
                                                                    .value,
                                                            })
                                                        }
                                                    />
                                                ) : (
                                                    value.views
                                                )}
                                            </td>
                                            <td>
                                                {editingIndex === index ? (
                                                    <FormControl
                                                        type="text"
                                                        size="sm"
                                                        value={inputData.genre}
                                                        onChange={(event) =>
                                                            setInputData({
                                                                ...inputData,
                                                                genre: event
                                                                    .target
                                                                    .value,
                                                            })
                                                        }
                                                    />
                                                ) : (
                                                    value.genre
                                                )}
                                            </td>
                                            <td>
                                                <div className="d-flex align-items-center">
                                                    {editingIndex === index ? (
                                                        <FormControl
                                                            type="text"
                                                            size="sm"
                                                            value={
                                                                inputData.descriptions
                                                            }
                                                            onChange={(event) =>
                                                                setInputData({
                                                                    ...inputData,
                                                                    descriptions:
                                                                        event
                                                                            .target
                                                                            .value,
                                                                })
                                                            }
                                                        />
                                                    ) : (
                                                        <>
                                                            <span className="excerpt">
                                                                {
                                                                    value.descriptions
                                                                }
                                                            </span>
                                                            <i
                                                                className="fas fa-info-circle text-info"
                                                                onClick={() =>
                                                                    handleShowModal(
                                                                        value.descriptions
                                                                    )
                                                                }
                                                            ></i>
                                                        </>
                                                    )}
                                                </div>
                                            </td>
                                            <td>
                                                {editingIndex === index ? (
                                                    <>
                                                        <i
                                                            className="fas fa-save text-success"
                                                            onClick={() =>
                                                                handleSave(
                                                                    index
                                                                )
                                                            }
                                                        ></i>
                                                        <i
                                                            className="fas fa-window-close ms-2 text-muted"
                                                            onClick={() =>
                                                                setEditingIndex(
                                                                    undefined
                                                                )
                                                            }
                                                        ></i>
                                                    </>
                                                ) : (
                                                    <>
                                                        <i
                                                            className="fas fa-pen-square text-primary"
                                                            onClick={() =>
                                                                handleEdit(
                                                                    value,
                                                                    index
                                                                )
                                                            }
                                                        ></i>
                                                        <i
                                                            className="fas fa-trash text-danger ms-2"
                                                            onClick={() =>
                                                                handleDelete(
                                                                    index
                                                                )
                                                            }
                                                        ></i>
                                                    </>
                                                )}
                                            </td>
                                        </tr>
                                    )
                                )}
                        </tbody>
                    </Table>
                </div>
            </Container>
        </>
    );
};

export default App;
