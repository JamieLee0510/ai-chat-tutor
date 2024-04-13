import { Card } from "@/components/ui/card";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Separator } from "@radix-ui/react-dropdown-menu";

const FeedbackDisplayArea = ({
    id,
    label,
    content,
}: {
    id: string;
    label: string;
    content: string;
}) => {
    return (
        <>
            <Label className="text-lg" htmlFor={id}>
                {label}
            </Label>
            <div
                className="border-2 p-2 bg-slate-100 dark:bg-slate-600 rounded"
                id={id}
            >
                {content}
            </div>
        </>
    );
};

export default function FeedbackDialog({
    isOpen,
    setIsOpen,
    previousText,
    feedbackText,
}: {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    previousText: string;
    feedbackText: string;
}) {
    return (
        <Dialog
            open={isOpen}
            onOpenChange={(value) => {
                setIsOpen(value);
            }}
        >
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="text-center text-2xl">
                        AI tutor feedback
                    </DialogTitle>
                </DialogHeader>

                <FeedbackDisplayArea
                    id="feedback"
                    label="Feedback:"
                    content={feedbackText}
                />
                <Separator />
                <FeedbackDisplayArea
                    id="previous"
                    label="Previous Answer:"
                    content={previousText}
                />
            </DialogContent>
        </Dialog>
    );
}
