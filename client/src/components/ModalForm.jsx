import Button from "./Button";

const ModalForm = ({ isOpen, closeModal, modalType, modalData, pictures, tags, host, equipments, onChange, handleAdd, handleDelete, sendForm }) => {

    if (!isOpen) {
        return null;
    }
    return (
        <aside id="modal" className="modal" aria-hidden="true" role="dialog" aria-modal="false" onClick={(e) => {
            if (e.target.id === "modal") {
                closeModal(e)
            }
        }}>
            <div className="modal-wrapper">
                <Button onClick={e => closeModal(e)} text={'Fermer'} className='button-hover close-modal-btn' />
                {modalType === 'add' && (
                    <>
                        <h2>Ajouter un logement</h2>
                        <form>
                            <label htmlFor="title">Titre</label>
                            <input type="text" name="title" id="title" onChange={e => onChange(e)} />
                            <label>Photo de couverture</label>
                            <input type="text" name="cover" id="cover" onChange={e => onChange(e)} />
                            <label htmlFor="pictures">Photos</label>
                            <div className='formRow'>
                                <input type="text" name="pictures" id="pictures" />
                                <Button text="+" className='button-validate' value={'picture'} onClick={e => handleAdd(e)} />
                            </div>
                            {
                                            pictures && pictures.length > 0 &&
                                            <div className="img-preview">
                                                {pictures.map((picture, index) => {
                                                    return (
                                                        <div key={index} className='formRow'>
                                                            <img id={`picture${index}`} src={picture} alt="" />
                                                            <Button text="-" value={'picture'} onClick={e => handleDelete(e, index)} />
                                                        </div>
                                                    )
                                                })}
                                            </div>

                                        }
                            <label htmlFor="description">Description</label>
                            <textarea name="description" id="description" cols="30" rows="10" onChange={e => onChange(e)}></textarea>
                            <label htmlFor="hostname">Nom de l'hôte</label>
                            <input type="text" name="hostname" id="hostname" onChange={e => onChange(e)} />
                            <label htmlFor="hostPicture">Photo de l'hôte</label>
                            <input type="text" name="hostPicture" id="hostPicture" onChange={e => onChange(e)} />
                            <label htmlFor="rating">Note</label>
                            <input type="number" name="rating" id="rating" min={0} max={5} onChange={e => onChange(e)} />
                            <label htmlFor="location">Localisation</label>
                            <input type="text" name="location" id="location" onChange={e => onChange(e)} />
                            <label htmlFor="equipments">Équipements</label>
                            <div className='formRow'>
                                <input type="text" name="equipments" id="equipments" />
                                <Button text="+" value={'equipment'} className='button-validate' onClick={e => handleAdd(e)} />
                            </div>
                            {
                                equipments.length > 0 &&
                                equipments.map((equipment, index) => {
                                    return (
                                        <div key={index} className='formRow'>
                                            <input type="text" name="equipments" id={`equipment${index}`} value={equipment} readOnly />
                                            <Button text="-" value={'equipment'} onClick={e => handleDelete(e, index)} />
                                        </div>
                                    )
                                })
                            }
                            <label htmlFor="tags">Tags</label>
                            <div className='formRow'>
                                <input type="text" name="tags" id="tags" />
                                <Button text="+" value={'tag'} className='button-validate' onClick={e => handleAdd(e)} />
                            </div>
                            {
                                tags.length > 0 &&
                                tags.map((tag, index) => {
                                    return (
                                        <div key={index} className='formRow'>
                                            <input type="text" name="tags" id={`tag${index}`} value={tag} readOnly />
                                            <Button text="-" value={'tag'} onClick={e => handleDelete(e, index)} />
                                        </div>
                                    )
                                })
                            }
                            <div className="form-btns">
                                <Button text="Annuler" className={'form-validate-btn button-hover'} onClick={e => closeModal(e)} />
                                <Button text="Ajouter" className="button-validate form-validate-btn button-hover" onClick={e => sendForm(e)} />
                            </div>
                        </form>
                    </>
                )}
                {modalType === 'edit' && (
                    <>
                        <h2>Modifier un logement</h2>
                        {
                            modalData && pictures.length && equipments.length && tags.length ? (
                                <>

                                    <form>
                                        <label htmlFor="title">Titre</label>
                                        <input type="text" name="title" id="title" onChange={e => onChange(e)} value={modalData.title} />
                                        <label>Photo de couverture</label>
                                        <input type="text" name="cover" id="cover" onChange={e => onChange(e)} value={modalData.cover} />
                                        <label htmlFor="pictures">Photos</label>
                                        <div className='formRow'>
                                            <input type="text" name="pictures" id="pictures" />
                                            <Button text="+" value={'picture'} className='button-validate' onClick={e => handleAdd(e)} />
                                        </div>
                                        {
                                            pictures && pictures.length > 0 &&
                                            <div className="img-preview">
                                                {pictures.map((picture, index) => {
                                                    return (
                                                        <div key={index} className='formRow'>
                                                            <img id={`picture${index}`} src={picture} alt="" />
                                                            <Button text="-" value={'picture'} onClick={e => handleDelete(e, index)} />
                                                        </div>
                                                    )
                                                })}
                                            </div>

                                        }

                                        <label htmlFor="description">Description</label>
                                        <textarea name="description" id="description" cols="30" rows="10" onChange={e => onChange(e)} value={modalData.description}></textarea>
                                        <label htmlFor="hostname">Nom de l'hôte</label>
                                        <input type="text" name="hostname" id="hostname" onChange={e => onChange(e)} value={host.name} />
                                        <label htmlFor="hostPicture">Photo de l'hôte</label>
                                        <input type="text" name="hostPicture" id="hostPicture" onChange={e => onChange(e)} value={host.picture} />
                                        <label htmlFor="rating">Note</label>
                                        <input type="number" name="rating" id="rating" min={0} max={5} onChange={e => onChange(e)} value={modalData.rating} />
                                        <label htmlFor="location">Localisation</label>
                                        <input type="text" name="location" id="location" onChange={e => onChange(e)} value={modalData.location} />
                                        <label htmlFor="equipments">Équipements</label>
                                        <div className='formRow'>
                                            <input type="text" name="equipments" id="equipments" />
                                            <Button text="+" value={'equipment'} className='button-validate' onClick={e => handleAdd(e)} />
                                        </div>
                                        {
                                            equipments.length > 0 &&
                                            equipments.map((equipment, index) => {
                                                return (
                                                    <div key={index} className='formRow'>
                                                        <input type="text" name="equipments" id={`equipment${index}`} value={equipment} readOnly />
                                                        <Button text="-" value={'equipment'} onClick={e => handleDelete(e, index)} />
                                                    </div>
                                                )
                                            })
                                        }
                                        <label htmlFor="tags">Tags</label>
                                        <div className='formRow'>
                                            <input type="text" name="tags" id="tags" />
                                            <Button text="+" value={'tag'} className='button-validate' onClick={e => handleAdd(e)} />
                                        </div>
                                        {
                                            tags.length > 0 &&
                                            tags.map((tag, index) => {
                                                return (
                                                    <div key={index} className='formRow'>
                                                        <input type="text" name="tags" id={`tag${index}`} value={tag} readOnly />
                                                        <Button text="-" value={'tag'} onClick={e => handleDelete(e, index)} />
                                                    </div>
                                                )
                                            })
                                        }
                                        <div className="form-btns">
                                            <Button text="Annuler" className={'form-validate-btn button-hover'} onClick={e => closeModal(e)} />
                                            <Button text="Modifier" className="button-validate form-validate-btn button-hover" onClick={e => sendForm(e)} />
                                        </div>
                                    </form>
                                </>
                            ) : <p>Chargement...</p>

                        }

                    </>
                )}
                {modalType === 'delete' && (
                    <>
                        <h2>Supprimer un logement</h2>
                        <div className="delete-confirmation">
                            <p>Êtes-vous sûr de vouloir supprimer ce logement ?</p>
                            <p>Cette action est irréversible.</p>
                            <div className="delete-confirmation__btns">
                                <Button text="Annuler" className={'button-hover form-validate-btn'} onClick={e => closeModal(e)} />
                                <Button text="Oui, supprimer définitivement" className={'button-hover form-validate-btn button-validate'} onClick={e => sendForm(e)} />
                            </div>
                        </div>
                    </>
                )}
            </div>
        </aside>
    )
}
export default ModalForm;