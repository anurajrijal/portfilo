import { useEffect } from 'react';
import { WX_LAT, WX_LON } from '../data';
import { fetchWeather } from '../lib/weather';

const CLOUD = <path d="M22 70a18 18 0 0 1 4-35 26 26 0 0 1 50 6 15 15 0 0 1-2 29z" />;
const ICONS = {
  storm: (
    <>
      {CLOUD}
      <g stroke="#5b6f7c">
        <path d="M32 78l-7 14h9l-7 14M56 78l-7 14h9l-7 14" />
      </g>
    </>
  ),
  rain: (
    <>
      {CLOUD}
      <path d="M30 80l-4 14M46 80l-4 14M62 80l-4 14" />
    </>
  ),
  cloud: CLOUD,
  clear: (
    <>
      <circle cx="48" cy="55" r="18" />
      <path d="M48 18v10M48 82v10M11 55h10M75 55h10M22 29l7 7M67 74l7 7M22 81l7-7M67 36l7-7" />
    </>
  ),
};

const Stat = ({ label, children }) => (
  <div className="my-4 text-[13px] text-hi">
    {label}
    <b className="mt-1 block font-normal text-ink">{children}</b>
  </div>
);

function Compass({ wind, dir }) {
  return (
    <svg
      viewBox="-5 -12 150 160"
      width="150"
      role="img"
      aria-label={'Wind ' + wind + ' km/h'}
      className="max-[480px]:w-[130px]"
    >
      <g stroke="#6a8794" strokeWidth="2">
        {Array.from({ length: 36 }, (_, i) => (
          <line key={i} x1="70" y1="10" x2="70" y2={i % 9 ? 16 : 21} transform={`rotate(${i * 10} 70 70)`} />
        ))}
      </g>
      <g fill="#b9d3dd" fontSize="13" textAnchor="middle" dominantBaseline="central">
        <text x="70" y="34">N</text>
        <text x="106" y="70">E</text>
        <text x="70" y="106">S</text>
        <text x="34" y="70">W</text>
      </g>
      <text x="70" y="64" fill="#fff" fontSize="17" fontWeight="700" textAnchor="middle">{wind}</text>
      <text x="70" y="82" fill="#b9d3dd" fontSize="12" fontWeight="700" textAnchor="middle">KM/H</text>
      <polygon points="70,-2 64,-11 76,-11" fill="#fff" transform={`rotate(${dir} 70 70)`} />
    </svg>
  );
}

/**
 * wx: weather data (+ `live` flag), owned by <App/> so it survives closing the window.
 * Tries browser geolocation, falls back to WX_LAT/WX_LON, otherwise keeps sample data.
 * Refreshes every 10 minutes while the window is open.
 */
export default function Weather({ wx, setWx }) {
  useEffect(() => {
    let alive = true;

    const go = async (lat, lon) => {
      if (lat == null || lon == null) {
        if (alive) setWx((w) => ({ ...w, live: false }));
        return;
      }
      try {
        const data = await fetchWeather(lat, lon);
        if (alive) setWx((w) => ({ ...w, ...data, live: true }));
      } catch {
        if (alive) setWx((w) => ({ ...w, live: false }));
      }
    };

    const run = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (p) => go(p.coords.latitude, p.coords.longitude),
          () => go(WX_LAT, WX_LON),
          { timeout: 8000 }
        );
      } else {
        go(WX_LAT, WX_LON);
      }
    };

    run();
    const id = setInterval(run, 600000);
    return () => {
      alive = false;
      clearInterval(id);
    };
  }, [setWx]);

  return (
    <div>
      <div className="mb-2.5 mt-1.5 flex items-center gap-7 max-[480px]:gap-4">
        <svg
          viewBox="0 0 96 110"
          aria-hidden="true"
          className="h-[110px] w-24 fill-none stroke-hi stroke-[3] [stroke-linecap:round] [stroke-linejoin:round]"
        >
          {ICONS[wx.icon] || ICONS.cloud}
        </svg>
        <div>
          <div className="text-[84px] font-light leading-none text-hi max-[480px]:text-[60px]">
            {wx.temp}
            <sup className="ml-1.5 align-top text-[26px]">C°</sup>
          </div>
          <div className="mt-1.5 text-xl text-hi">{wx.cond}</div>
        </div>
      </div>

      <div className="my-3.5 h-px bg-line" />

      <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2.5 text-center">
        <div>
          <Stat label="Humidity">{wx.humidity}%</Stat>
          <Stat label="Pressure">{wx.pressure} hPa</Stat>
        </div>
        <Compass wind={wx.wind} dir={wx.dir} />
        <div>
          <Stat label="Pollution">{wx.pollution}</Stat>
          <Stat label="Visibility">{wx.visibility} KM</Stat>
        </div>
      </div>
    </div>
  );
}
