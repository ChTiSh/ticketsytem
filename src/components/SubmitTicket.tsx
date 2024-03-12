import * as Form from '@radix-ui/react-form';
 
export default function SubmitTicket (): JSX.Element {
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = Object.fromEntries(new FormData(event.currentTarget));
        //need to send the data to databasen once the db connection is setup
        console.log(data);
        try {
            const response = await fetch('http://localhost:3000/api/ticket-data', {
                method: 'POST',
                headers: {  
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
    
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
    
            const result = await response.json();
            console.log('Form submitted successfully:', result);
            // Handle successful form submission here, maybe clear the form or show a success message
        } catch (error) {
            console.error('Form submission error:', error);
            // Handle errors here, like showing an error message to the user
        }
    }
    return (
        <Form.Root onSubmit={handleSubmit}>
            <Form.Field className="FormField" name="name">
                <Form.Label className='FormLabel'>
                    Name
                </Form.Label>
                <Form.Control asChild>
                    <input className='Input' type='text' required />
                </Form.Control>
                <Form.Message className='FormMessage' match='valueMissing'>
                    Please enter your name
                </Form.Message>
            </Form.Field>

            <Form.Field className="FormField" name="email">
                <Form.Label className='FormLabel'>
                    Email
                </Form.Label>
                <Form.Control asChild>
                    <input className='Input' type='email' required />
                </Form.Control>
                <Form.Message className="FormMessage" match="valueMissing">
                    Please enter your email
                </Form.Message>
                <Form.Message className="FormMessage" match="typeMismatch">
                    Please provide a valid email
                </Form.Message>
            </Form.Field>

            <Form.Field className="FormField" name="question">
            <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
                <Form.Label className="FormLabel">Question</Form.Label>
                <Form.Message className="FormMessage" match="valueMissing">
                    Please provide a detailed description of the issue or question
                </Form.Message>
            </div>
            <Form.Control asChild>
                <textarea className="Textarea" required />
            </Form.Control>
            </Form.Field>

            <Form.Submit asChild>
                <button className="Button" style={{ marginTop: 10 }}>
                    Submit your ticket
                </button>
            </Form.Submit>
        </Form.Root>
    );
}
