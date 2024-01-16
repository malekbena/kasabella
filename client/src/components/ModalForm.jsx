import Button from "./Button";
import Tag from "./Tag";

const ModalForm = ({ isOpen, closeModal, modalType, modalData, pictures, tags, host, equipments, onChange, handleAdd, handleDelete, sendForm, message }) => {

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
                {
                    message ? (
                        <p className="modal__message">{message}</p>
                    ) : (
                        <>
                            <h2>
                                {modalType === 'delete' ? 'Supprimer un logement' : modalType === 'edit' ? 'Modifier un logement' : 'Ajouter un logement'}
                            </h2>
                            {modalType === 'delete' ? (

                                <div className="delete-confirmation">
                                    <p>Êtes-vous sûr de vouloir supprimer ce logement ?</p>
                                    <p>Cette action est irréversible.</p>
                                    <div className="delete-confirmation__btns">
                                        <Button text="Annuler" className={'button-hover form-validate-btn'} onClick={e => closeModal(e)} />
                                        <Button text="Oui, supprimer définitivement" className={'button-hover form-validate-btn button-validate'} onClick={e => sendForm(e)} />
                                    </div>
                                </div>
                            ) : (

                                <form>
                                    <label htmlFor="title">Titre</label>
                                    <input type="text" name="title" id="title" value={modalData.title} onChange={e => onChange(e)} />
                                    <label>Photo de couverture</label>
                                    <input type="text" name="cover" id="cover" value={modalData.cover} onChange={e => onChange(e)} />
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
                                    <textarea name="description" id="description" cols="30" rows="10" value={modalData.description} onChange={e => onChange(e)}></textarea>
                                    <label htmlFor="hostname">Nom de l'hôte</label>
                                    <input type="text" name="hostname" id="hostname" value={host.name} onChange={e => onChange(e)} />
                                    <label htmlFor="hostPicture">Photo de l'hôte</label>
                                    <input type="text" name="hostPicture" id="hostPicture" value={host.picture} onChange={e => onChange(e)} />
                                    <label htmlFor="rating">Note</label>
                                    <input type="number" name="rating" id="rating" min={0} max={5} value={modalData.rating} onChange={e => onChange(e)} />
                                    <label htmlFor="location">Localisation</label>
                                    <input type="text" name="location" id="location" value={modalData.location} onChange={e => onChange(e)} />
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
                                                    <Tag tag={equipment} />
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
                                                    <Tag tag={tag} />
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
                            )}
                        </>
                    )
                }
            </div>
        </aside>
    )
}
export default ModalForm;