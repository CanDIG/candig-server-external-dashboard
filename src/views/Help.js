import React from 'react';

// reactstrap components
import { Card, CardBody } from 'reactstrap';

/*
 * Help component
 */
function Help() {
  return (
    <>
      <div className="content">

        <div className="card-columns">
          <Card className="m-3">
            <CardBody>
              <h5 className="card-title">Overview of each page</h5>
              <h6 className="card-subtitle mb-2 text-muted">Overview</h6>
              <p className="card-text">
                This page contains high-level overview of clinical data.
              </p>
              <h6 className="card-subtitle mb-2 text-muted">Patient Overview</h6>
              <p className="card-text">
                This page contains high-level overview of patients data.
              </p>
              <h6 className="card-subtitle mb-2 text-muted">Clinical Metadata</h6>
              <p className="card-text">
                This page allows you to see different types of clinical data.
              </p>
              <h6 className="card-subtitle mb-2 text-muted">Custom Visualization</h6>
              <p className="card-text">
                This page allows you to generate different types of charts on aggregated data on certain fields.
              </p>
              <h6 className="card-subtitle mb-2 text-muted">File Directory</h6>
              <p className="card-text">
                This page allows you to view a list of genomic datasets, including variantSets (VCFs), readGroupSets (BAM),
                featureSets, referenceSets etc.
              </p>
              <h6 className="card-subtitle mb-2 text-muted">Variants Search</h6>
              <p className="card-text">
                This page allows you to search for variants across all of the VCF files.
              </p>
              <h6 className="card-subtitle mb-2 text-muted">VCF Browser</h6>
              <p className="card-text">
                This page allows you to visualize multiple VCF files via IGV.js browser.
              </p>
              <h6 className="card-subtitle mb-2 text-muted">Reads Search</h6>
              <p className="card-text">
                This page allows you to search for alignments across all of the BAM/CRAM files hosted.
              </p>
              <h6 className="card-subtitle mb-2 text-muted">BAM Browser</h6>
              <p className="card-text">
                This page allows you to visualize multiple BAM/CRAM files via IGV.js browser.
              </p>
              <h6 className="card-subtitle mb-2 text-muted">Beacon Search</h6>
              <p className="card-text">
                This page allows you to check for the existence/basic coordinates
                of variants. Unlike Variants Search, you can only get limited info of variants here.
              </p>
              <h6 className="card-subtitle mb-2 text-muted">API Info</h6>
              <p className="card-text">
                This page contains API documentation.
              </p>
            </CardBody>
          </Card>
          <Card className="m-3">
            <CardBody>
              <h5 className="card-title">FAQ</h5>
              <h6 className="card-subtitle mb-2 text-muted">Why do some charts not load?</h6>
              <p className="card-text">
                Some of the datasets do not have data for certain fields, and corresponding charts will not load.
              </p>
              <h6 className="card-subtitle mb-2 text-muted">How do I view different datasets?</h6>
              <p className="card-text">
                You may change the selected dataset from the dropdown in the top-right corner.
              </p>
              <h6 className="card-subtitle mb-2 text-muted">Why does chromosome dropdown contain both chr1 and 1, for example?</h6>
              <p className="card-text">
                Different pipelines use different naming conventions for chromosomes, some use chr1, and some use 1, both of which
                represent chromosome 1. We do not know beforehand which convention is used in each dataset, so both are given.
                If you know in advanced, great! If not, please try both.
              </p>
            </CardBody>
          </Card>
          <Card className="m-3">
            <CardBody>
              <h5 className="card-title">Terminologies</h5>
              <h6 className="card-subtitle mb-2 text-muted">ReadGroupSet</h6>
              <p className="card-text">
                A set of reads. One readgroupset represents one BAM/CRAM file.
              </p>
              <h6 className="card-subtitle mb-2 text-muted">VariantSet</h6>
              <p className="card-text">
                A set of variants. One variantset usually represents one VCF file.
              </p>
              <h6 className="card-subtitle mb-2 text-muted">Beacon</h6>
              <p className="card-text">
                Beacon, in our context, represents APIs that check for existence of particular variants.
              </p>
            </CardBody>
          </Card>
        </div>

      </div>
    </>
  );
}

export default Help;
