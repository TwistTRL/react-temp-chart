## Required parameters
```javascript
<TempChartBundle
                    data={data}
                    dtWindow={dtWindow}
                    width={width}
                    height={height} />
TempChartBundle.propTypes = {
    data: PropTypes.array.isRequired,
    dtWindow: PropTypes.array.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired
}
```