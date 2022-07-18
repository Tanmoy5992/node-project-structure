const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Cryptr = require('cryptr');
const cryptr = new Cryptr('1');	

exports.createToken = async (userdtls) => {
    var jwtToken =await jwt.sign(userdtls, process.env.JWT_SECRET, { algorithm: process.env.ALGORITHM, 
        expiresIn: process.env.JWT_EXPIRES});
    return jwtToken;
}

// For Password Encryption	
exports.hashPassword = async (passsword) => {	
    var salt = await bcrypt.genSaltSync(10);
    var hash = await bcrypt.hashSync(passsword, salt); 
    return hash;
}

// For Password Decryption
exports.comparePassword = async (password,hash) => {		
    if (await bcrypt.compareSync(password, hash)) {
        return true; 
    } else {
        return false; 
    }
}

// id encryption
exports.encryptId = async (id) => {
    //console.log('fff')
    const encryptedId = await cryptr.encrypt(id);
    return encryptedId;
}

// ID Decryption
exports.decryptId = async (encId) => {
    const decryptedId = await cryptr.decrypt(encId);
    return decryptedId;
}