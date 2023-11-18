import { prisma } from '../lib/prisma.js'; // Assuming you have a prisma instance
import { OffersController } from './offer-ctrls.js';
const offerController = new OffersController();
describe('getAllOffersFromOneRecruiter', () => {
    let req;
    let res;
    beforeEach(() => {
        req = {
            params: {
                id: '1', // Provide a valid recruiter ID here
            },
        };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
    });
    afterEach(() => {
        jest.clearAllMocks();
    });
    it('should return all offers from a recruiter', async () => {
        const recruiterId = '1'; // Provide a valid recruiter ID here
        const offers = [
            { id: 1, title: 'Offer 1', userId: recruiterId },
            { id: 2, title: 'Offer 2', userId: recruiterId },
        ];
        jest.spyOn(prisma.user, 'findUnique').mockResolvedValueOnce({ id: recruiterId });
        jest.spyOn(prisma.offer, 'findMany').mockResolvedValueOnce(offers);
        await getAllOffersFromOneRecruiter(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(offers);
    });
    it('should return 400 if recruiter ID is missing', async () => {
        req.params.id = ''; // Set an empty string to simulate missing ID
        await getAllOffersFromOneRecruiter(req, res);
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ message: 'Paramètre manquant' });
    });
    it('should return 404 if recruiter is not found', async () => {
        jest.spyOn(prisma.user, 'findUnique').mockResolvedValueOnce(null);
        await getAllOffersFromOneRecruiter(req, res);
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({ message: 'Recruteur introuvable' });
    });
    it('should return 500 if an error occurs', async () => {
        jest.spyOn(prisma.user, 'findUnique').mockRejectedValueOnce(new Error('Database error'));
        await getAllOffersFromOneRecruiter(req, res);
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ 'Erreur lors de la récupération des offres': expect.any(Error) });
    });
});
