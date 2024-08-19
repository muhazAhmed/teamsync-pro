import { REQUIRE_FIELD, RESPONSE_MESSAGE } from "../../utils/validations.js";
import LoanModel from "../../models/LoanModel.js";
import { genRandomStringNumber, getUserModelByRole } from "../../utils/helper.js";

export const newLoanReq = async(req, res) => {
    try {
        const id = req.params.id;
        const role = req.params.role;

        const data = req.body;
        const { loanId, employeeId, appliedOn, loanAmount, loanStatus, reporter, repaymentStatus } = data;
        if (!id) return res.status(400).json({message: REQUIRE_FIELD("User ID")});
        if (!role) return res.status(400).json({message: REQUIRE_FIELD("User Role")});
        if (!loanAmount) return res.status(400).json({message: REQUIRE_FIELD("Loan Amount")});

        data.loanId = genRandomStringNumber(6).toUpperCase();
        data.employeeId = req.params.id;

        const userModel = getUserModelByRole(role)
        const fetchUserData = await userModel.findOne({_id: id});
        if (!fetchUserData) return res.status(404).json({message: RESPONSE_MESSAGE("").NO_USER_FOUND})
        data.reporter = fetchUserData.employment.reportingManager;
        
        await LoanModel.create(data);
        return res.status(201).json({message: RESPONSE_MESSAGE("").REQUEST_ADDED})
    } catch (error) {
        console.log(error.message)
        return res.status(500).json(RESPONSE_MESSAGE("").SERVER_ERROR);
    }
}

export const fetchOneLoan = async(req, res) => {
    try {
        const id = req.params.id;
        if (!id) return res.status(400).json({message: REQUIRE_FIELD("ID")});
        const fetchUser = await LoanModel.findOne({_id: id});
        if (!fetchUser) return res.status(404).json({message: RESPONSE_MESSAGE("").NO_USER_FOUND})
        else return res.status(200).json(fetchUser);
    } catch (error) {
        console.log(error.message)
        return res.status(500).json(RESPONSE_MESSAGE("").SERVER_ERROR);
    }
}

export const fetchAllLoanById = async(req, res) => {
    try {
        const id = req.params.id;

    } catch (error) {
        console.log(error.message)
        return res.status(500).json(RESPONSE_MESSAGE("").SERVER_ERROR);
    }
}

export const updateLoanData = async(req, res) => {
    try {
        const id = req.params.id;
        const data = req.body;
        const { loanId, employeeId, appliedOn, loanAmount, loanStatus, reporter, repaymentStatus } = data;

    } catch (error) {
        console.log(error.message)
        return res.status(500).json(RESPONSE_MESSAGE("").SERVER_ERROR);
    }
}

export const deleteLoanData = async(req, res) => {
    try {
        const id = req.params.id;

    } catch (error) {
        console.log(error.message)
        return res.status(500).json(RESPONSE_MESSAGE("").SERVER_ERROR);
    }
}