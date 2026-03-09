interface TestProps {
    id: string | number;
    name: string;
    email: string;
    age: number;
}
export const testData: TestProps[] = [
    {
        id: 1,
        name: 'john',
        email: 'john@gmail.com',
        age: 30
    },
    {
        id: 2,
        name: 'tester',
        email: 'tester@testmail.com',
        age: 35
    }
]