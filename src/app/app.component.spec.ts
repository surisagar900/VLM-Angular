import { TestBed, async } from "@angular/core/testing";
import { AppComponent } from "./app.component";

describe("AppComponent", () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent],
    });
  });

  it("should create the app", async(() => {
    let fixture = TestBed.createComponent(AppComponent);
    let app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  // it(`should have loading prop equals to false`, () => {
  //   let fixture = TestBed.createComponent(AppComponent);
  //   let app = fixture.componentInstance;
  //   expect(app.loading).toEqual(false);
  // });
});
