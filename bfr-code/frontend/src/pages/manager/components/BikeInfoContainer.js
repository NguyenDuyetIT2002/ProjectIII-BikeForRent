import React from 'react'
import { useNavigate } from 'react-router'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const BikeInfoContainer = ({bikeInfo, deleteBike}) => {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const navigate = useNavigate();
    const handleEditClick = () => {
        // Navigate to the 'Editbike' route and pass the 'bikeInfo'
        navigate(`/manager/editbike`, { state: { bikeInfo } });
    };

    const handleDeleteClick = () => {
        deleteBike(bikeInfo._id);
    };

    return (
        <div className="flex flex-row my-10 p-10 border-2 border-black rounded-lg">
            <img src={bikeInfo.image} alt='Bike image'></img>   
            <table className='table ml-10'>
                <tbody>
                    <tr>
                        <td>{bikeInfo.name}</td>
                    </tr>
                    <tr>
                        <td>Type: {bikeInfo.type}</td>

                    </tr>
                    <tr>
                        <td>Status: {bikeInfo.status}</td>
                    </tr>
                    <tr>
                        <td>Rent price: {bikeInfo.price}.000 VND</td>
                    </tr>
                    <tr>
                        <td>Description: {bikeInfo.description}</td>
                    </tr>
                    <tr>
                        <td>Rented by: </td>
                    </tr>
                    <tr>
                        <td>Ban Report: {bikeInfo.banRequestAmount}</td>
                    </tr>
                    <tr>
                        <td>
                            <button className='px-2 py-1 border-2 border-black rounded-lg' onClick={handleClickOpen}>
                                Delete
                            </button>
                        </td>

                        <td>
                            <button className='px-2 py-1 border-2 border-black rounded-lg' onClick={handleEditClick}>
                                Edit
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Xác nhận xóa xe"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Bạn muốn thực hiện xóa xe {bikeInfo.name} khỏi cửa hàng của bạn?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDeleteClick}>Xác nhận</Button>
                    <Button onClick={handleClose} autoFocus>
                        Hủy
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default BikeInfoContainer