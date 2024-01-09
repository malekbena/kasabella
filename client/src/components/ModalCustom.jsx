import Modal from 'react-modal'
import Button from './Button'


const ModalCustom = ({ modalIsOpen, setModalIsOpen, modalType, modalData, pictures, equipments, tags, closeModal, handleAdd, handleDelete, onChange, sendForm }) => {

    const customStyles = {
        content: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',

        },
        form: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
        },
        formRow: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
        }
    }

    return (
<Modal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)} className="modal" style={customStyles}>
                {modalType === 'add' && (
                    <>
                        <h2>Ajouter un logement</h2>
                        <form style={customStyles.form}>
                            <label htmlFor="title">Titre</label>
                            <input type="text" name="title" id="title" onChange={e=>onChange(e)}/>
                            <label>Cover</label>
                            <input type="text" name="cover" id="cover" onChange={e=>onChange(e)} />
                            <label htmlFor="pictures">Photos</label>
                            <div style={customStyles.formRow}>
                                <input type="text" name="pictures" id="pictures" />
                                <Button text="+" value={'picture'} onClick={e => handleAdd(e)} />
                            </div>
                            {
                                pictures.length > 0 &&
                                pictures.map((picture, index) => {
                                    return (
                                        <div key={index} style={customStyles.formRow}>
                                            <input type="text" name="pictures" id={`picture${index}`} value={picture} readOnly />
                                            <Button text="-" value={'picture'} onClick={e => handleDelete(e, index)} />
                                        </div>
                                    )
                                })
                            }

                            <label htmlFor="description">Description</label>
                            <textarea name="description" id="description" cols="30" rows="10" onChange={e=>onChange(e)}></textarea>
                            <label htmlFor="hostname">Nom de l'hôte</label>
                            <input type="text" name="hostname" id="hostname" onChange={e=>onChange(e)}/>
                            <label htmlFor="hostPicture">Photo de l'hôte</label>
                            <input type="text" name="hostPicture" id="hostPicture" onChange={e=>onChange(e)}/>
                            <label htmlFor="rating">Note</label>
                            <input type="number" name="rating" id="rating" min={0} max={5} onChange={e=>onChange(e)}/>
                            <label htmlFor="location">Localisation</label>
                            <input type="text" name="location" id="location" onChange={e=>onChange(e)}/>
                            <label htmlFor="equipments">Équipements</label>
                            <div style={customStyles.formRow}>
                                <input type="text" name="equipments" id="equipments" />
                                <Button text="+" value={'equipment'} onClick={e => handleAdd(e)} />
                            </div>
                            {
                                equipments.length > 0 &&
                                equipments.map((equipment, index) => {
                                    return (
                                        <div key={index} style={customStyles.formRow}>
                                            <input type="text" name="equipments" id={`equipment${index}`} value={equipment} readOnly />
                                            <Button text="-" value={'equipment'} onClick={e => handleDelete(e, index)} />
                                        </div>
                                    )
                                })
                            }
                            <label htmlFor="tags">Tags</label>
                            <div style={customStyles.formRow}>
                                <input type="text" name="tags" id="tags" />
                                <Button text="+" value={'tag'} onClick={e => handleAdd(e)} />
                            </div>
                            {
                                tags.length > 0 &&
                                tags.map((tag, index) => {
                                    return (
                                        <div key={index} style={customStyles.formRow}>
                                            <input type="text" name="tags" id={`tag${index}`} value={tag} readOnly />
                                            <Button text="-" value={'tag'} onClick={e => handleDelete(e, index)} />
                                        </div>
                                    )
                                })
                            }
                            <Button text="Ajouter" className="button__add" onClick={e=>sendForm(e)}/>
                            <Button text="Annuler" onClick={e => closeModal(e)} />
                        </form>
                    </>
                )}
                {modalType === 'edit' && (
                    <>
                        <h2>Modifier un logement</h2>
                        <form style={customStyles.form}>
                            <label htmlFor="title">Titre</label>
                            <input type="text" name="title" id="title" onChange={e=>onChange(e)} defaultValue={modalData.title}/>
                            <label>Cover</label>
                            <input type="text" name="cover" id="cover" onChange={e=>onChange(e)} defaultValue={modalData.cover}/>
                            <label htmlFor="pictures">Photos</label>
                            <div style={customStyles.formRow}>
                                <input type="text" name="pictures" id="pictures" />
                                <Button text="+" value={'picture'} onClick={e => handleAdd(e)} />
                            </div>
                            {
                                pictures && pictures.length  > 0 &&
                                pictures.map((picture, index) => {
                                    return (
                                        <div key={index} style={customStyles.formRow}>
                                            <input type="text" name="pictures" id={`picture${index}`} value={picture} readOnly />
                                            <Button text="-" value={'picture'} onClick={e => handleDelete(e, index)} />
                                        </div>
                                    )
                                })
                            }

                            <label htmlFor="description">Description</label>
                            <textarea name="description" id="description" cols="30" rows="10" onChange={e=>onChange(e)} defaultValue={modalData.description}></textarea>
                            <label htmlFor="hostname">Nom de l'hôte</label>
                            <input type="text" name="hostname" id="hostname" onChange={e=>onChange(e)} defaultValue={modalData.host.name}/>
                            <label htmlFor="hostPicture">Photo de l'hôte</label>
                            <input type="text" name="hostPicture" id="hostPicture" onChange={e=>onChange(e)} defaultValue={modalData.host.picture}/>
                            <label htmlFor="rating">Note</label>
                            <input type="number" name="rating" id="rating" min={0} max={5} onChange={e=>onChange(e)} defaultValue={modalData.rating}/>
                            <label htmlFor="location">Localisation</label>
                            <input type="text" name="location" id="location" onChange={e=>onChange(e)} defaultValue={modalData.location}/>
                            <label htmlFor="equipments">Équipements</label>
                            <div style={customStyles.formRow}>
                                <input type="text" name="equipments" id="equipments" />
                                <Button text="+" value={'equipment'} onClick={e => handleAdd(e)} />
                            </div>
                            {
                                equipments.length > 0 &&
                                equipments.map((equipment, index) => {
                                    return (
                                        <div key={index} style={customStyles.formRow}>
                                            <input type="text" name="equipments" id={`equipment${index}`} value={equipment} readOnly />
                                            <Button text="-" value={'equipment'} onClick={e => handleDelete(e, index)} />
                                        </div>
                                    )
                                })
                            }
                            <label htmlFor="tags">Tags</label>
                            <div style={customStyles.formRow}>
                                <input type="text" name="tags" id="tags" />
                                <Button text="+" value={'tag'} onClick={e => handleAdd(e)} />
                            </div>
                            {
                                tags.length > 0 &&
                                tags.map((tag, index) => {
                                    return (
                                        <div key={index} style={customStyles.formRow}>
                                            <input type="text" name="tags" id={`tag${index}`} value={tag} readOnly />
                                            <Button text="-" value={'tag'} onClick={e => handleDelete(e, index)} />
                                        </div>
                                    )
                                })
                            }
                            <Button text="Modifier" onClick={e=>sendForm(e)}/>
                            <Button text="Annuler" onClick={e => closeModal(e)} />
                        </form>
                    </>
                )}
                {modalType === 'delete' && (
                    <>
                        <h2>Supprimer un logement</h2>
                        <p>Êtes-vous sûr de vouloir supprimer ce logement ?</p>
                        <Button text="Supprimer" onClick={e => sendForm(e)} />
                        <Button text="Annuler" onClick={e => closeModal(e)} />
                    </>
                )}
            </Modal>
    )
}

export default ModalCustom