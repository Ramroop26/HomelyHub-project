const fs = require('fs');
const content = fs.readFileSync('D:/homlyhub-frontend/backendObfuscated/routes/userRoutes.js', 'utf8');

const _0x11b2f7 = ['post', 'get', '/forgotPassword', '/me', '3ygWwvh', '../controllers/propertyController', '4QCcEpP', 'protect', 'Router', 'exports', '../controllers/bookingController', '16ogBjBv', '/resetPassword/:token', '217428wqJTzp', '/signup', 'getcheckOutSession', '562930cqFboX', '3497301dwWFzc', 'createProperty', 'isLoggedIn', '30835512vuuseG', 'forgotPassword', '/newAccommodation', 'express', '../controllers/authController', '/myAccommodation', '/booking', 'patch', 'getBookingDetails', '33liQMji', 'updateMe', 'signup', 'route', '/checkout-session', '6sipzYn', '/login', '/logout', '/updateMyPassword', '/booking/:bookingId', '2367FYfeiW', '/updateMe', 'getUserBookings', 'login', 'logout', '4309800roHpLh', '2267503dIFrNJ', 'getUsersProperties'];

function _0x2715(_0x271550) {
    _0x271550 = _0x271550 - 0xea;
    return _0x11b2f7[_0x271550];
}

const deobfuscated = content.replace(/_0x18f239\((0x[0-9a-f]+)\)/g, (match, hex) => {
    const val = _0x2715(parseInt(hex, 16));
    return val ? `'${val}'` : match;
});

console.log(deobfuscated);
