use std::error::Error;

use serde::{Serialize, Deserialize};
use xjbutil::minhttpd::{HttpBody, HttpHeaders, HttpParams, HttpResponse};

#[derive(Serialize, Deserialize, Copy, Clone)]
struct ControlPoint {
    x: f64,
    y: f64
}

#[derive(Serialize, Deserialize)]
struct BezierOptions {
    // start is always (0, 0)
    control1: ControlPoint,
    control2: ControlPoint,
    end: ControlPoint,
    step: f64
}

pub fn compute_bezier(
    _: HttpHeaders, _: HttpParams, body: HttpBody
) -> Result<HttpResponse, Box<dyn Error>> {
    let bezier_options = serde_json::from_str::<BezierOptions>(
        &body.ok_or("unexpected empty body")?
    )?;
    Ok(HttpResponse::builder().set_payload(
        serde_json::to_string(&compute_bezier_impl(bezier_options)?)?
    ).add_header("Content-Type", "application/json").build())
}

pub fn compute_bezier_series(
    _: HttpHeaders,
    _: HttpParams,
    body: HttpBody
) -> Result<HttpResponse, Box<dyn Error>> {
    let bezier_options = serde_json::from_str::<Vec<BezierOptions>>(
        &body.ok_or("unexpected empty body")?
    )?;
    let mut series = Vec::new();
    series.reserve(bezier_options.len());
    for bezier_option in bezier_options {
        series.push(compute_bezier_impl(bezier_option)?);
    }

    Ok(HttpResponse::builder().set_payload(
        serde_json::to_string(&series)?
    ).add_header("Content-Type", "application/json").build())
}

fn compute_bezier_impl(options: BezierOptions) -> Result<Vec<f64>, Box<dyn std::error::Error>> {
    let mut points = Vec::new();
    let mut t = 0.0;
    while t <= 1.0 {
        let ControlPoint { x: x1, y: y1 } = options.control1;
        let ControlPoint { x: x2, y: y2 } = options.control2;
        let ControlPoint { x: x3, y: y3 } = options.end;

        let coeff1 = 3.0 * t * (1.0 - t) * (1.0 - t);
        let coeff2 = 3.0 * t * t * (1.0 - t);
        let coeff3 = t * t * t;

        let x = coeff1 * x1 + coeff2 * x2 + coeff3 * x3;
        let y = coeff1 * y1 + coeff2 * y2 + coeff3 * y3;

        points.push((x, y));
        t += 0.0001;
    }

    points.sort_by(|a, b| a.0.partial_cmp(&b.0).unwrap());

    let mut result = Vec::new();

    let x_max = points.last().unwrap().0;
    let mut x_delim = options.step;
    let mut i = 0;
    let mut data_in_this_window = Vec::new();

    while i < points.len() && x_delim <= x_max {
        if points[i].0 > x_delim {
            if data_in_this_window.len() == 0 {
                data_in_this_window.push(points[i]);
            }

            let average = (
                data_in_this_window
                    .iter()
                    .map(|p| p.1)
                    .sum::<f64>()
            ) / data_in_this_window.len() as f64;

            result.push(average);
            data_in_this_window.clear();
            x_delim = options.step * (result.len() + 1) as f64;
        } else {
            data_in_this_window.push(points[i]);
            i += 1;
        }
    }

    Ok(result)
}


