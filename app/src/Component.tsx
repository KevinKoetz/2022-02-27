
interface CardProps {
    id: string;
    title: string;
    content: string;
    onDelete: (id: string) => void 
}

export default function Card (props: CardProps) {
    return <div></div>
} 