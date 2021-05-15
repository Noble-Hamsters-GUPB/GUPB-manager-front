import {Button, Dialog, DialogActions, DialogTitle} from "@material-ui/core";
import {Link} from "react-router-dom";
import RequirementService from "../../services/RequirementService";

export const LibraryRemoveDialog= (props: {library, libList, setLibList, url}) => {
    const removeLibrary = (library) => {
        RequirementService.deleteRequirement(library.id).then(res => {
            props.setLibList(props.libList.filter(lib => lib!==library))
        })
        //    DONE: backend communication
    }

    return(
        <Dialog open={true} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
            <DialogTitle>Are you sure you want to remove {props.library.name} library?</DialogTitle>
            <DialogActions>
            <Button component={Link} to={props.url}
                variant="contained" color="primary" autoFocus>
                Cancel
            </Button>
            <Button component={Link} to={props.url} onClick={(e) =>
            removeLibrary(props.library)} color="primary">
                Yes
            </Button>
            </DialogActions>
        </Dialog>
)

}
