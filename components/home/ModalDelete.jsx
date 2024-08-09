import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger,} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { useDelete } from "@/hooks/CRUD_home"

export default function ModalDelete({data , btn_name }) {

    const [handleSubmit] = useDelete('/api/word?id='+data?._id , btn_name)
    return (
      <AlertDialog>
        <AlertDialogTrigger asChild >
          <Button id={btn_name} style={{display:"none"}} variant="outline">Show Dialog</Button>
        </AlertDialogTrigger>

        <AlertDialogContent>

            <AlertDialogHeader>
                <AlertDialogTitle>Are you sure to delete this word?</AlertDialogTitle>
                <AlertDialogDescription>  </AlertDialogDescription>
            </AlertDialogHeader>

            <AlertDialogFooter>
                <AlertDialogCancel>  Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleSubmit} > Continue</AlertDialogAction>
            </AlertDialogFooter>

        </AlertDialogContent>
      </AlertDialog>
    )
  }
  