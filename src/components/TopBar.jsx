export default function TopBar() {
  return (
    <div className="topbar">
      <div className="container">
        <address className="topbar-item">
          <div className="icon">
            <ion-icon name="location-outline" aria-hidden="true"></ion-icon>
          </div>
          <span className="span">
            53-G, JALAN KS 5, KEPAYANG SENTRAL, 70200 SEREMBAN, N.S.D.K
          </span>
        </address>

        <div className="separator"></div>

        <div className="topbar-item item-2">
          <div className="icon">
            <ion-icon name="time-outline" aria-hidden="true"></ion-icon>
          </div>
          <span className="span">Daily : 10.00 am to 6.00 pm</span>
        </div>

        <a href="tel:+60106668311" className="topbar-item link">
          <div className="icon">
            <ion-icon name="call-outline" aria-hidden="true"></ion-icon>
          </div>
          <span className="span">+60 10 666 8311</span>
        </a>

        <div className="separator"></div>

        <a href="mailto:Bglrenovation@gmail.com" className="topbar-item link">
          <div className="icon">
            <ion-icon name="mail-outline" aria-hidden="true"></ion-icon>
          </div>
          <span className="span">Bglrenovation@gmail.com</span>
        </a>
      </div>
    </div>
  );
}
