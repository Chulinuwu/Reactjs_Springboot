'use server'

export async function deleteProduct(id: number): Promise<{ message: string }> {
    const res = await fetch(`http://localhost:8080/api/products/${id}`, {
        method: 'DELETE',
    });

    if (!res.ok) {
        const errorData = await res.text();
        console.error('Server Error:', errorData);
        throw new Error(`Failed to delete product: ${errorData}`);
    }

    const responseBody = await res.text();
    
    if (!responseBody) {
        return { message: "Deleted successfully" };
    }

    return JSON.parse(responseBody);
}
