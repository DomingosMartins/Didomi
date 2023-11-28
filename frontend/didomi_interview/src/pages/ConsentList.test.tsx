

import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ConsentList from './ConsentList';
import { v4 } from 'uuid';

export const consentsData = [
    {
        id: v4(),
        name: "John Doe",
        email: "john@mock.com",
        receiveNewsletter: true,
        showTargetedAds: false,
        contributeToStatistics: true,
    },
    {
        id: v4(),
        name: "Alice Smith",
        email: "alice@mock.com",
        receiveNewsletter: false,
        showTargetedAds: true,
        contributeToStatistics: false,
    },
    {
        id: v4(),
        name: "Other Consent",
        email: "other@mock.com",
        receiveNewsletter: true,
        showTargetedAds: false,
        contributeToStatistics: true,
    },
];

describe('ConsentList component', () => {

    global.fetch = jest.fn(() =>
        Promise.resolve({
            json: () => Promise.resolve({ data: consentsData }),
        }),
    ) as jest.Mock;


    test('renders consent list correctly', async () => {
        render(<ConsentList />);

        const consentJohnDoe = await screen.findByText('John Doe');
        const consentAliceSmith = screen.getByText('Alice Smith');

        expect(consentJohnDoe).toBeInTheDocument();
        expect(consentAliceSmith).toBeInTheDocument();
    });

    test('paginates consents correctly', async () => {
        render(<ConsentList />);

        await screen.findByText('John Doe');

        expect(screen.getByText('John Doe')).toBeInTheDocument();
        expect(screen.getByText('Alice Smith')).toBeInTheDocument();
        expect(screen.queryByText('Other Consent')).toBeNull();

        const nextButton = screen.getByTitle('Go to next page');
        userEvent.click(nextButton);

        await screen.findByText('Other Consent');
        expect(screen.queryByText('John Doe')).toBeNull();
        expect(screen.queryByText('Alice Smith')).toBeNull();
    });
});
