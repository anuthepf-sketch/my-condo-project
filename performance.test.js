import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
    vus: 50,
    duration: '30s',
};

export default function () {
    // ชี้ตรงไปที่ชื่อบริการ condo-backend ในระบบ Docker Network
    const res = http.get('http://condo-backend:5000/api/booking');

    check(res, {
        'status is 200': (r) => r.status === 200,
        'response time < 500ms': (r) => r.timings.duration < 500,
    });

    sleep(1);
}