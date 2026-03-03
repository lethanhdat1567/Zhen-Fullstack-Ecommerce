import { contactService } from "@/services/contactService";

async function AdminContactDetail({ params }: { params: { id: string } }) {
    const { id } = await params;

    const res = await contactService.detail(id as string);
    return (
        <div>
            <h1>{res.fullname}</h1>
            <p>{res.email}</p>
            <p>{res.phone_number}</p>
            <p>{res.content}</p>
        </div>
    );
}

export default AdminContactDetail;
