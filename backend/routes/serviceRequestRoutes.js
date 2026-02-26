const express = require('express');
const router = express.Router();
const { getAllServiceRequests, createServiceRequest, updateServiceRequestStatus } = require('../controllers/serviceRequestController');
const { protect, authorize } = require('../middleware/auth');

router.use(protect);

/**
 * @swagger
 * /api/service-requests:
 *   get:
 *     summary: Get all service requests
 *     tags: [Service Requests]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of service requests
 */
router.get('/', getAllServiceRequests);

/**
 * @swagger
 * /api/service-requests:
 *   post:
 *     summary: Create service request (Client only)
 *     tags: [Service Requests]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               service:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Service request created successfully
 */
router.post('/', authorize('client'), createServiceRequest);

/**
 * @swagger
 * /api/service-requests/{id}/status:
 *   patch:
 *     summary: Update service request status (Admin only)
 *     tags: [Service Requests]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *     responses:
 *       200:
 *         description: Service request status updated
 */
router.patch('/:id/status', authorize('admin'), updateServiceRequestStatus);

module.exports = router;
